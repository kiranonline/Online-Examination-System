var mongoose = require("../services/connection");
var resultSchema = require("../schemas/results");

var ResultModel = mongoose.model('ResultModel',resultSchema);
module.exports = ResultModel;