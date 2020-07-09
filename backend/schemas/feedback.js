var mongoose = require("mongoose");
var feedbackschema = new mongoose.Schema({
    feedback : {
        type : String,
        required : false
    },
    rating : {
        type : Number,
        required : false
    },
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'TraineeEnterModel',
        required : true
    },
    testid :{ 
        type: mongoose.Schema.Types.ObjectId,
        ref : 'TestPaperModel',
        required : true
    }
})
module.exports = feedbackschema;