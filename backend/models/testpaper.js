var mongoose = require("mongoose");
var testschema = require("../schemas/testpaper");

var TestPaperModel = mongoose.model(`TestPaperModel`,testschema);
module.exports=TestPaperModel;