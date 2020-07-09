var mongoose = require("mongoose");
var optionschema = require("../schemas/options");

var options = mongoose.model('Options',optionschema);
module.exports = options;
