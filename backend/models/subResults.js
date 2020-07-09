var mongoose = require("mongoose");
var subResultsSchema = require("../schemas/subResults");

var subResultsModel = mongoose.model('subResultsModel',subResultsSchema);
module.exports  = subResultsModel;