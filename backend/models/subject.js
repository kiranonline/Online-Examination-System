var mongoose = require("../services/connection");
var subjectschema = require("../schemas/subjects");


var SubjectModel = mongoose.model(`SubjectModel`,subjectschema);
module.exports=SubjectModel;