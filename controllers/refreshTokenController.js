const User = require('../model/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
   res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'});
    

    const foundUser = await User.findOne({ refreshToken }).exec();
    // console.log(foundUser)
    if (!foundUser) {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser = await User.findOne({ emailId: decoded.emailId }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }


 const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);


    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser.emailId !== decoded.emailId) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
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

            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true,secure: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({roles, accessToken })
        }
    );


}

module.exports = { handleRefreshToken }