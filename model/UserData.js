const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./User');


const userSchema = new Schema({
  usersdetail:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Userdetail' 
},
  balance:{
  type:Number,
   default:"0",
  },
  status:{
    type:String,
    default:"Active",
  },
  accountNumber:{
    type:Number,
    default:9678906437,
  }

},
{ id: false },
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});



userSchema.virtual('Name').get(function() {
  return this.usersdetail.firstname + ' ' + this.usersdetail.lastname;
});








const UserDetails =  mongoose.model('User', userSchema);


module.exports = UserDetails 



    //  { 
    //     "name":"john",
    //    "accountType":"savings"
    //    }