var mongoose = require("mongoose");
var subResultsSchema = new mongoose.Schema({
    qid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'QuestionModel',
        required : true       
    },
    explanation : {
        type : String,
        required : true  
    },
    correctAnswer : {
        type: Array,
        required : true
    },
    givenAnswer : {
        type : Array,
        required : true
    },
    weightage : {
        type : Number,
        required : true
    },
    iscorrect : {
        type : Boolean
    }
    
})
module.exports = subResultsSchema;