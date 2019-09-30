var mongoose = require("../services/connection");
var questionschema = require("../schemas/questions");

var QuestionModel = mongoose.model(`QuestionModel`,questionschema);
module.exports=QuestionModel;