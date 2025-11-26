// const { isThisHour } = require('date-fns/esm');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
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
    emailId: {
        type: String,
        required:  [true, 'Email is a required field!'],
        unique:true
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
        required:  [true, 'Pin is required field!']
    },
    password: {
        type: String,
        required:  [true, 'Password is required field!'],
    },
    confirmpassword: {
        type: String,
        required: [true, 'Confirm password is required field!']
    },
    passport:{
        type: String,
        required: [true, 'passport is required field!']
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
        Admin: Number
    },
     refreshToken: [String],
    balance:Number
}, { id: false },{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

// employeeSchema.virtual('Name').get(function() {
//   return this.firstname + ' ' + this.lastname;
// });



employeeSchema.pre('save', function(next) {
    this.balance = 0;
    next();
})

employeeSchema.post('save', function(doc, next){
    const content = `A new user document with name ${doc.firstname} has been created by ${doc.lastname}\n`;
    console.log(content);
    next();
});


// employeeSchema.pre(/^find/, function(next){
//     console.log(this.getFilter())
//     next();
// });

// employeeSchema.post(/^find/, function(docs, next){
//     console.log(docs)
//     next();
// });


const User = mongoose.model('Userdetail', employeeSchema);

module.exports = User




// create obj
// [
//     {
//         "firstname":"DevJav",
//         "lastname":"Jermain",
//         "middlename":"Osteen",
//         "address":"Pure street",
//         "country":"USA",
//         "state":"Las vegas",
//         "city":"osbourne",
//         "zipcode":"1891",
//         "dateofbirth":"1994",
//         "houseaddress":"Purestreet",
//         "phonenumber":"0899033",
//         "email":"DevJav@gmail.com",
//         "occupation":"programmer",
//         "annualincome":"900k",
//         "ssn":"984653",
//         "accounttype":"check",
//         "currency":"usd",
//         "pin":"76353",
//         "password":"test123",
//         "confirmpassword":"test123",
//         "passport":"javealuuuxxx"

//     }
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



