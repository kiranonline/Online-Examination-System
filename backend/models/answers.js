var mongoose = require("mongoose");
var answerSchema = require("../schemas/answers");

var AnswersModel =  mongoose.model('AnswersModel',answerSchema)
module.exports = AnswersModel;