const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
     const { email, password,confirmpassword, ...rest} = req.body;
       console.log(req.body)

     // if (!email || !password || !confirmpassword ) return res.status(400).json({ 'message': 'Email and password are required.' });
    //     if () {
    //     return res.status(400).json({ 'message': 'All feilds are required' });
    // }
  
 // check for duplicate usernames in the db
    const duplicate = await User.findOne({ emailId : email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 


    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
         const hashedConfirmedPwd = await bcrypt.hash(confirmpassword, 10);

        const result = await User.create({
            ...rest,
            emailId : email,
            password: hashedPwd,
            confirmpassword:hashedConfirmedPwd
        
        });
      
        res.status(201).json({ 'success': `New user ${result.emailId} created!` });
        // res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
    }


    // const { user, pwd } = req.body;
    // if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // // check for duplicate usernames in the db
    // const duplicate = await User.findOne({ username: user }).exec();
    // if (duplicate) return res.sendStatus(409); //Conflict 

    // try {
    //     //encrypt the password
    //     const hashedPwd = await bcrypt.hash(pwd, 10);

    //     //create and store the new user
    //     const result = await User.create({
    //         "username": user,
    //         "password": hashedPwd
    //     });

    //     console.log(result);

    //     res.status(201).json({ 'success': `New user ${user} created!` });
    // } catch (err) {
    //     res.status(500).json({ 'message': err.message });
    // }
}

module.exports = { handleNewUser };