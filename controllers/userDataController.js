const UserDetails = require('../model/UserData');


// Route to add to the account balance

const add = async (req, res) => {

  const { balance } = req.body;

   if (!req._id) return res.sendStatus(401)
 

  const userD = await UserDetails.findOne({ 'usersdetail' : req._id});

  try {

  if (!userD) {
      // Create account if it doesn't exist
  // const userD = new UserDetails({
  //       usersdetail: req._id,
  //       balance: balance,
  //     });
  //       await userD.save();
   throw new Error("no user")
    } else {

      userD.usersdetail.balance += +balance; // Add amount to existing balance
      await userD.save();
    }


    res.json({ message: 'Balance updated'});

  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};



const subtract = async (req, res) => {
  const { balance } = req.body;

  let userD = await UserDetails.findOne({ 'usersdetail' : req._id});
  try {
    if (!userD) {
      return res.status(404).send('Account not found');
    }

    if (userD.balance < balance) {
      return res.status(400).send('Insufficient balance');
    }

    userD.balance -= balance; // Subtract amount from existing balance
    await userD.save();
    res.json({ message: 'Balance updated', balance: userD.balance });
  } catch (err) {
    res.status(500).send('Server error');
  }
}


const getUser = async (req, res) => {
    try{
    const userD = await UserDetails.findOne({ 'usersdetail' : req._id})
    .select('-_id -id')
    .populate('usersdetail',"firstname emailId lastname country balance").select('-__v')
    .select('-_id -id').exec();

  if(!userD){
     throw new Error("no user")
  }
    res.json(userD);

} catch (error) {
        res.status(400).json(error.message)
    }
}


module.exports = {
    add,
    getUser,
    subtract
}



// let obj = {
// name,
// balance,
// status,
// type,
// account number
// }



