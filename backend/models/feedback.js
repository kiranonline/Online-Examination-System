var mongoose = require("mongoose");
var feedbackschema = require("../schemas/feedback");

var FeedbackModel = mongoose.model('FeedbackModel',feedbackschema);
module.exports = FeedbackModel;
