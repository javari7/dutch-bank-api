const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
 const cookies = req.cookies;

    const { emailId, password } = req.body;
    if (!emailId || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await User.findOne({ emailId : emailId }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
               "UserInfo": {
                "_id":foundUser._id,
                "emailId": foundUser.emailId,
                "roles": roles
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const  newRefreshToken = jwt.sign(
            { "emailId": foundUser.emailId,
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


        // Saving refreshToken with current user
    


         foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];


        const result = await foundUser.save();


        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true,sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true,

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };