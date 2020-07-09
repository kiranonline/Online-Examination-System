var mongoose = require("mongoose");
var UserModel = require("../models/user");


var questionschema = new mongoose.Schema({
     body : {
        required : true ,
        type : String
    },
    weightage :{
        required : true,
        type : Number,
        default : 1

    },
    anscount : {
        required : true,
        type : Number,
        default : 1

    },
    options : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Options',
        required : true
    }],
    explanation : {
        type : String,
        required : true
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubjectModel',
        required : true
    },
    quesimg: { 
        required : false,
        default : null,
        type : String
    },
    difficulty:{
        required : true,
        default : 0,
        type : Number
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

    module.exports = questionschema;



