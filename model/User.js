// const { isThisHour } = require('date-fns/esm');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');



const userSchema = new Schema({
    firstname: {
        type: String,
       required: [true, 'First name is required field!']
    },
    lastname: {
        type: String,
        required:  [true, 'Last name is required field!']
    },
    middlename: {
        type: String,
        required: [true, 'Middle name is required field!']
    },
    address: {
        type: String,
        required:  [true, 'Address is required field!']
    },
    country: {
        type: String,
        required:  [true, 'Country is required field!']
    },
    state: {
        type: String,
        required:  [true, 'State is required field!']
    },
    city: {
        type: String,
        required:  [true, 'City is required field!']
    },
    zipcode: {
        type: Number,
        required:  [true, 'Zip code is required field!']
    },
    dateofbirth: {
        type: Date,
        required:  [true, 'Date of birth is required field!']
    },
    houseaddress: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required:  [true, 'Phone number is a required field!']
    },
    email: {
        type: String,
        required:  [true, 'Email is a required field!'],
        unique:true,
        lowercase:true,
        validator :[validator.isEmail, 'Please enter a valid email']
    },
    occupation: {
        type: String,
        required:  [true, 'Occupation is required field!']
    },
    annualincome: {
        type: String,
        required:  [true, 'Annual income is required field!']
    },
    ssn: {
        type: Number,
        required:  [true, 'SSN is required field!']
    },
    accounttype: {
        type: String,
        required: [true, 'Account type is required field!']
    },
    currency: {
        type: String,
        required: [true, 'Currency is required field!']
    },
    pin: {
        type: Number,
        // required:  [true, 'Pin is required field!']
    },
    password: {
        type: String,
        required:  [true, 'Password is required field!'],
        minlength:8
       
    },
    confirmpassword: {
        type: String,
        required: [true, 'Confirm password is required field!'],
        validate : {
            validator: function(val){
             return  val === this.password;
            },
        message : 'password and confirmpassword does not match'
        }
       
    },
    passport:{
        type: String,
    },
     roles: {
        User: {
            type: Number,
            default: 2001 
        },
        Editor:{
            type: Number,
            default: 1984
        },
        Admin: Number,
        select:false
    },
     refreshToken: [String],

    passwordChangedAt:Date,
     passwordResetToken:String,
     passwordResetTokenExpire:Date

}, { id: false }
);



    userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next()
            //encrypt password
    this.password =  await bcrypt.hash(this.password, 12);

    this.confirmpassword = undefined;

    next()
    })


    userSchema.methods.comparePasswordInDb = async function(pswd, psdDb){
        return await bcrypt.compare(pswd, psdDb);
    }




 userSchema.methods.createResponseResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
   this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000 ;


//    console.log(resetToken, this.passwordResetToken)

   return resetToken;

    }


































// employeeSchema.virtual('fullName').get(function() {
//   return this.firstname + ' ' + this.lastname;
// });





// employeeSchema.pre(/^find/, function(next){
//     console.log(this.getFilter())
//     next();
// });

// employeeSchema.post(/^find/, function(docs, next){
//     console.log(docs)
//     next();
// });


const User = mongoose.model('User', userSchema);

module.exports = User




// create obj
// [
    // {
    //     "firstname":"DevJav",
    //     "lastname":"Jermain",
    //     "middlename":"Osteen",
    //     "address":"Pure street",
    //     "country":"USA",
    //     "state":"Las vegas",
    //     "city":"osbourne",
    //     "zipcode":"1891",
    //     "dateofbirth":"1994",
    //     "houseaddress":"Purestreet",
    //     "phonenumber":"0899033",
    //     "email":"DevJav@gmail.com",
    //     "occupation":"programmer",
    //     "annualincome":"900k",
    //     "ssn":"984653",
    //     "accounttype":"check",
    //     "currency":"usd",
    //     "pin":"76353",
    //     "password":"test123",
    //     "confirmpassword":"test123",
    //     "passport":"javealuuuxxx"

    // }
// ]


// name,balance,status,type,account number


// let obj = {
// name,
// balance,
// status,
// type,
// account number
// }


  


    // {
    //     "firstname":"Gray",
    //     "lastname":"Richie",
    //     "middlename":"lakers",
    //     "address":"naizi's street",
    //     "country":"Englang",
    //     "state":"anston villa",
    //     "city":"cardiffe",
    //     "zipcode":"1856",
    //     "dateofbirth":"1990",
    //     "houseaddress":"naizistreet",
    //     "phonenumber":"08946465673",
    //     "email":"Gray@gmail.com",
    //     "occupation":"Bnaker",
    //     "annualincome":"800k",
    //     "ssn":"989653",
    //     "accounttype":"Checking",
    //     "currency":"usd",
    //     "pin":"4674768",
    //     "password":"test123",
    //     "confirmpassword":"test123",
    //     "passport":"Richie luuuxxx"

    // }



