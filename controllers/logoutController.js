const User = require('../model/User');

// const handleLogout = async (req, res) => {
//     // On client, also delete the accessToken

//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204); //No content
//     const refreshToken = cookies.jwt;

//     // Is refreshToken in db?
//     const foundUser = await User.findOne({ refreshToken }).exec();
//     if (!foundUser) {
//         res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });   //secure: true
//         return res.sendStatus(204);
//     }

//     // Delete refreshToken in db
//     foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
//     const result = await foundUser.save({ validateBeforeSave:false});
//     // console.log(result);

//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
//     res.sendStatus(204);
// }



// module.exports = { handleLogout };





// const User = require('../model/User');

// const handleLogout = async (req, res) => {
//     const cookies = req.cookies;

//     // No JWT cookie → nothing to logout
//     if (!cookies?.jwt) return res.sendStatus(204);

//     const refreshToken = cookies.jwt;

//     // Try finding user with that refresh token
//     const foundUser = await User.findOne({ refreshToken }).exec();

//     // Token not in DB → clear cookie anyway
//     if (!foundUser) {
//         res.clearCookie('jwt', { 
//             httpOnly: true, 
//             sameSite: 'None', 
//             secure: true 
//         });
//         return res.sendStatus(204);
//     }

//     // Filter out this token from array (matches your refresh logic)
//     foundUser.refreshToken = foundUser.refreshToken.filter(
//         rt => rt !== refreshToken
//     );

//     await foundUser.save({ validateBeforeSave: false });

//     // Clear cookie
//     res.clearCookie('jwt', { 
//         httpOnly: true, 
//         sameSite: 'None', 
//         secure: true 
//     });

//     return res.sendStatus(204);
// };




const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies.jwt;

    // Atomic update - removes token in one operation
    const result = await User.findOneAndUpdate(
        { refreshToken: refreshToken },
        { $pull: { refreshToken: refreshToken } },
        { new: true }
    ).exec();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
};





module.exports = { handleLogout };





