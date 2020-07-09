var mongoose = require("mongoose");
var UserModel = require("../models/user");

var subjectschema = new mongoose.Schema({
    topic : {
        required : true,
        type : String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    status:{
        type: Boolean,
        default : 1,
        required : true
    }
},
{ timestamps: {}}

);


module.exports = subjectschema;
