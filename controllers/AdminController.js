
const UserDetails = require('../model/UserData');
const asyncErrorHandler = require('../utils/asyncErrorHandlers');
const CustomError = require('../Utils/CustomError');




const getUser = asyncErrorHandler(async (req, res) => {

    const userD = await UserDetails.findOne({ 'usersdetail' : req.params.id}) //await User.findById(req.params.id)
    .select('-_id -id')
    .populate('usersdetail',"firstname email lastname country balance").select('-__v')
    .select('-_id -id').exec();

  if(!userD){
     const error = new CustomError('Account with that ID is not found!', 404);
                return next(error);
  }
   
 res.status(200).json({
        'status':'success',
         data:{
           userD
         }
    });
}
) 


const getUsers = asyncErrorHandler(async(req, res)=> {
    
    const userD = await UserDetails.find()
     .select('-_id -id')
    .populate('usersdetail',"firstname email lastname country balance").select('-__v')
    .select('-_id -id').exec();
  
   res.status(200).json({
        status: 'success',
        userD
    });

}

) 







const upDateUser = async(req,res)=>{

  const { balance } = req.body;

 
  const returnbalance = await UserDetails.findOne({ 'usersdetail' : req.params.id});

  try {
  if (!returnbalance) {
   throw new Error("balance unavailable")
    } else {
      returnbalance.balance += +balance; // Add amount to existing balance
      await returnbalance.save();
    }

    res.status(200).json({
      status: "success",
      data:{
      returnbalance 
      },
      });

  } catch (err) {
    res.status(400).json({ message: err.message});
  }


}



const upDateUsers = async(req,res)=>{
        const {balance} = req.body
    try {
    const result = await UserDetails.updateMany(
      { },
      { balance}
    );
    
    res.json({
      message: 'Users updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}





module.exports = {
    getUser,
    getUsers,
    upDateUsers,
    upDateUser

}