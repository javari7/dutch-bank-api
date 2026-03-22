
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./User');


const transferSchema = new Schema({
  usersdetail:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  beneficiaryName:{
  type:String,
  },
  status:{
    type:String,
    default:"Pending",
  },
  AccountNumber:{
    type:Number
  },
    BankName:{
    type:String
  },
  RefCode:{
    type:String
  },
  DateOfTransfer:{
    type:Date,
    default:Date.now
  },
  AmountTransferred:{
    type:Number
  },
  PurposeOfTransfer:{
    type:String
  }
},
{ id: false },
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});





const TransferApi =  mongoose.model('TransferApi', transferSchema);


module.exports = TransferApi

















































/*
beneficiary name 
AccountNumber
Bank Name
Ref Code
Date of transfer
Amount transferred
Purpose of transfer

*/