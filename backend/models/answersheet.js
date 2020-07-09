var mongoose = require("mongoose");
var answersheetschema = require("../schemas/answersheet");

var AnswersheetModel = mongoose.model('AnswersheetModel',answersheetschema);
module.exports = AnswersheetModel;