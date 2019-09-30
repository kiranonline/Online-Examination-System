var mongoose = require("../services/connection");
var optionschema = require("../schemas/options");

var options = mongoose.model('Options',optionschema);
module.exports = options;
