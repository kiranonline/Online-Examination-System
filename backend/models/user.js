var mongoose = require("../services/connection");
var userschema = require("../schemas/user");


var UserModel = mongoose.model(`UserModel`,userschema);
module.exports=UserModel;