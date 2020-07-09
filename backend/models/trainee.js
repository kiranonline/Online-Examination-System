var mongoose = require("mongoose");
var traineeschema = require("../schemas/traineeenter");

var TraineeEnterModel = mongoose.model('TraineeEnterModel',traineeschema);
module.exports = TraineeEnterModel;