var mongoose = require("mongoose");
var resultSchema = require("../schemas/results");

var ResultModel = mongoose.model('ResultModel',resultSchema);
module.exports = ResultModel;