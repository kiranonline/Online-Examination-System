var mongoose = require("../services/connection");
var answersheetschema = require("../schemas/answersheet");

var AnswersheetModel = mongoose.model('AnswersheetModel',answersheetschema);
module.exports = AnswersheetModel;