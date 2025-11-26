const User = require('../model/User');
util =require('util');
const sendEmail = require('../utils/email');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const asyncErrorHandler = require('../utils/asyncErrorHandlers');
const CustomError = require('../Utils/CustomError');






const getAllUsers = asyncErrorHandler(async (req, res, next) => {

 const users = await User.find().select("-password -confirmpassword -roles");

   res.status(200).json({
        status: 'success',
        length: users.length,
        data: {
           users
        }
    });

})
// ) async (req, res) => {
   
// try{

//  const users = await User.find().select("-password -confirmpassword -roles");

//   res.status(200).json({
//         'status':'success',
//          length:users.length,
//          data:{
//             users
//          }
//     });

//     }catch(err){
//     res.status(404).json({
//         status:'fail',
//         message:err.message
//     })

//     }
   
// }


const getUser =asyncErrorHandler( async(req, res, next) => {

        const user = await User.findById(req.params.id)

        if(!user){
             const error = new CustomError('Account with that ID is not found!', 404);
                return next(error);
        }

    res.status(200).json({
        'status':'success',
         data:{
            user
         }
    });

}
)

//forgot route controller 

const forgotPassword = asyncErrorHandler (async(req,res)=>{
      const { email} = req.body;
    //1 GET USER BASED ON POSTED EMAIL 
    const user = await User.findOne({ email})
    if(!user){
        const error = new CustomError('We could not find the user with given email!', 404);
        return next(error);
    }
 

    //GENERATE A RANDOM RESET TOKEN 
    const resetToken = user.createResponseResetPasswordToken()

    await user.save({validateBeforeSave:false});


    //SEND THE TOKEN BACK TO THE USER EMAIL
    const resetUrl = `${req.protocol}://${req.get('host')}/users/resetPassword/${resetToken}`
    const message = `We have received a password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis. reset password link will be valid only for 10mins`
   

   try{
    await sendEmail({
        email:user.email,
        subject:"password change request received",
        message:message
    });

   res.status(200).json({
    status:"success",
    message:'password reset link send to user email'
   })

   }catch(err){
     user.passwordResetToken = undefined;
     user.passwordResetTokenExpire=undefined;
     user.save({validateBeforeSave:false});

     return res.status(500).json({message:err.message});

   }
    


}
) 


const resetPassword = async(req, res) => {
const {password,confirmpassword}=req.body;

  const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
   const user = await User.findOne({ passwordResetToken:token, passwordResetTokenExpire:{$gt:Date.now()}})

    if(!user){
        const error = new CustomError('Token is invalid or has expired', 404);
        return next(error);
    }  

   user.password =password;
  user.confirmpassword = confirmpassword;
  user.passwordResetToken =undefined;
  user.passwordResetTokenExpire =undefined;
  user.passwordChangedAt = Date.now();


 user.save()

  res.status(200).json({
    status:"succes",
    message:user
  })


}






module.exports = {
    getAllUsers,
    getUser,
    forgotPassword,
    resetPassword
}