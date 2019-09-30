var mongoose = require("../services/connection");
var traineeschema = require("../schemas/traineeenter");

var TraineeEnterModel = mongoose.model('TraineeEnterModel',traineeschema);
module.exports = TraineeEnterModel;