var mongoose = require("../services/connection");
var testschema = require("../schemas/testpaper");

var TestPaperModel = mongoose.model(`TestPaperModel`,testschema);
module.exports=TestPaperModel;