const mongoose = require("mongoose");

module.exports = mongoose.model("bookDetails", {
 
  // book details
  email:String,
  title:String,
  author:String,
  country:String,
  language:String,
  year:String,
  status:String,
  statusDate:Date,
  statusTime:String
});