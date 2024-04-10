const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  name: String,
  universityNo: String,
  department: String,
  contact: String,
  role: String,
  picture: Buffer,
  email: String,
  password: String,
  signupDate:String,
  signupTime:String,
  otp: Number,
  // New fields for login and logout timestamps
  loginDate: String,
  loginTime: String,
  logoutDate: String,
  logoutTime: String,
  // book details
  title:String,
  author:String,
  country:String,
  language:String,
  year:String,
  status:String,
  statusDate:String,
  statusTime:String,
  // qr code
  qrCode: String,
  // return details
  returnDate : String ,
  returnTime : String 
});
