var mongoose = require("mongoose");
var answerSchema = new mongoose.Schema({
    
        questionid : {
            type : String,
            required : true
        },
        chosenOption : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'options',
                required : false
            }
           
        ],
        userid:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'TraineeEnterModel',
            required : false
        }
    
})
module.exports = answerSchema;
 