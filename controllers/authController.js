const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    
 const cookies = req.cookies;
    const { email, password} = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    // evaluate password 

  
const foundUser = await User.findOne({ email }).select("+password");


//  const match =  foundUser.comparePasswordInDb(password, foundUser.password);


 if(!foundUser || !(await foundUser.comparePasswordInDb(password, foundUser.password))){
res.status(401).json({ 'message': 'wrong email password.' });
 }else{
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
               "UserInfo": {
                "_id":foundUser._id,
                "email": foundUser.email,
                "roles": roles
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const  newRefreshToken = jwt.sign(
            { "email": foundUser.email,
                 "_id":foundUser._id
             },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1h' }
        );


        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

           if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true,secure: true , sameSite: 'None', }); //secure: true 
        }


    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];

     // Saving refreshToken with current user
      const  user = await foundUser.save({ validateBeforeSave:false});


        


        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true,sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true,

        // Send authorization roles and access token to user
        //  res.status(200).json({
        //      'status': 'success',
        //      data:{
        //        roles,
        //        user,
        //         accessToken 
        //      }
        //     });
        res.status(200).json({ roles, accessToken });

    }
}

module.exports = { handleLogin };