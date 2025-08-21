const User = require('../model/User');
const UserDetails = require('../model/UserData');

const getAllUsers = async (req, res) => {

    const users = await User.find().select("-password");
    if (!users) return res.status(204).json({ 'message': 'No users found' });


     const userD = await UserDetails.findOne({ 'usersdetail' : req._id})
    .select('-_id -id')
    .populate('usersdetail',"firstname emailId").select('-__v')
    .select('-_id -id').exec();



    const allDetails = {
      ...users,
      userD
    }

      res.json(allDetails);


}



module.exports = {
    getAllUsers
}