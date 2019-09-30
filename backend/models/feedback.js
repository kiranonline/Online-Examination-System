var mongoose = require("../services/connection");
var feedbackschema = require("../schemas/feedback");

var FeedbackModel = mongoose.model('FeedbackModel',feedbackschema);
module.exports = FeedbackModel;
