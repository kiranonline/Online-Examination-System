var mongoose = require("mongoose");
var subjectschema = require("../schemas/subjects");


var SubjectModel = mongoose.model(`SubjectModel`,subjectschema);
module.exports=SubjectModel;