const mongoose = require("mongoose");

module.exports = mongoose.model("Books", {
 author:String,
 country:String,
 img:String,
 language:String,
 link :String,
 pages:String,
 title:String,
 year:String
});
