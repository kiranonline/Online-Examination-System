var TraineeEnterModel = require("../models/trainee");
var TestPaperModel = require("../models/testpaper");
var FeedbackModel = require("../models/feedback");
var sendmail = require("../services/mail").sendmail;
var QuestionModel = require("../models/questions");
var options = require("../models/option");
var AnswersheetModel = require("../models/answersheet");
var AnswersModel = require("../models/answers");

let traineeenter = (req,res,next)=>{
    req.check('emailid', ` Invalid email address.`).isEmail().notEmpty();
    req.check('name','This field is required.').notEmpty();
    req.check('contact','Invalid contact.').isLength({min : 13,max :13}).isNumeric({no_symbols: false});
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Invalid inputs',
            errors : errors
        })
    }
    else {
        var name =  req.body.name;
        var emailid =  req.body.emailid;
        var contact =  req.body.contact;
        var organisation =  req.body.organisation;
        var testid = req.body.testid;
        var location = req.body.location;

        TestPaperModel.findOne({ _id : testid, isRegistrationavailable : true }).then((info)=>{
            if(info){
                TraineeEnterModel.findOne({$or:[{emailid : emailid , testid : testid},{contact : contact, testid : testid}]}).then((data)=>{
                    if(data){
                        res.json({
                            success : false,
                            message : "This id has already been registered for this test!"
                        })
                    }
                    else{
                        var tempdata = TraineeEnterModel({
                            name: name,
                            emailid : emailid,
                            contact : contact,
                            organisation : organisation,
                            testid : testid,
                            location : location
                        })
                        tempdata.save().then((u)=>{
                                sendmail(emailid,"Registered Successfully",`You have been successfully registered for the test. Click on the link given to take test  "${req.protocol + '://' + req.get('host')}/trainee/taketest?testid=${testid}&traineeid=${u._id}"`).then((dd)=>{
                                    console.log(dd)
                                }).catch((errr)=>{
                                    console.log(errr);
                                })
                            res.json({
                                success : true,
                                message : `Trainee registered successfully!`,
                                user : u
                            })
                        }).catch((err)=>{
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Server error!"
                            })
                        })
                    }
                })
                
            }
            else{
                res.json({
                    success : false,
                    message : ` Registration for this test has been closed!`
                })
            }
            
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({
                success : false,
                message : `Server error!`
            })
        })
    }
}

let correctAnswers = (req,res,next)=>{
    var _id = req.body._id;
    TestPaperModel.find({_id:_id,testconducted:true},{type:0,subjects:0,duration:0,organisation:0,difficulty:0,testbegins:0,status:0,createdBy:0,isRegistrationavailable:0,testconducted:0})
    .populate('questions','body')
    .populate('questions','explanation')
    .populate({
        path:'questions',
        model : QuestionModel,
        select:{'body' : 1, 'quesimg' : 1,'weightage' : 1,'anscount' : 1,'explanation' : 1},
            populate:{
                path:'options',
                model:options
            }
    }).exec(function (err, correctAnswers){
        if(err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Unable to fetch details"
            })
        }
        else{
            if(!correctAnswers){
                res.json({
                    success : false,
                    message : 'Invalid test id.'
                })

            }
            else{
                res.json({
                    success : true,
                    message : 'Success',
                    data : correctAnswers
                })

            }
        }

    })
}

let feedback = (req,res,next)=>{
        var userid = req.body.userid;
        var testid = req.body.testid;
        var feedback =  req.body.feedback;
        var rating =  req.body.rating;
       
        var tempdata = FeedbackModel({
            feedback : feedback,
            rating : rating,
            userid : userid,
            testid : testid
        })
        tempdata.save().then(()=>{
            res.json({
                success : true,
                message : `Feedback recorded successfully!`
            })
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({
                success : false,
                message : "Error occured!"
            })
        })
    }

let checkFeedback = (req,res,next)=>{
    var userid = req.body.userid;
    var testid = req.body.testid;
    FeedbackModel.findOne({userid:userid,testid:testid}).then((info)=>{
        if(!info){
            res.json({
                success : true,
                message : 'Feedback is not given by this userid.',
                status : false
            })
        }else{
            res.json({
                success : true,
                message : 'Feedback given',
                status : true
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            success : false,
            message : "Error occured!"
        })
     })
}
    
let resendmail = (req,res,next)=>{
    var userid = req.body.id;
    TraineeEnterModel.findById(userid,{emailid:1,testid : 1}).then((info)=>{
        if(info){
            console.log(info)
            sendmail(info.emailid,"Registered Successfully",`You have been successfully registered for the test. Click on the link given to take test  "${req.protocol + '://' + req.get('host')}/trainee/taketest?testid=${info.testid}&traineeid=${info._id}"`).then((dd)=>{
                console.log(dd)
            }).catch((errr)=>{
                console.log(errr);
            })
            res.json({
                success : true,
                message : `Link sent successfully!`,

            })

        }
        else{
            res.json({
                success : false,
                message : "This user has not been registered."

            })
        }


    })

}

let Testquestions = (req,res,next)=>{
    var testid = req.body.id;
    TestPaperModel.findById(testid,{type:0,title:0,subjects:0,organisation:0,difficulty:0,testbegins:0,status:0,createdBy:0,isRegistrationavailable:0})
   .populate('questions','body')
   .populate({ 
     path: 'questions',
     model: QuestionModel,
     select : {'body': 1,'quesimg' : 1,'weightage':1,'anscount': 1,'duration' : 1},
       populate: {  
           path: 'options',
           select : {'optbody' : 1,'optimg' : 1}
       }

})
   .exec(function (err, Testquestions){
       if(err){
           console.log(err)
           res.status(500).json({
               success : false,
               message : "Unable to fetch details"
           })
       }
       else{
           if(!Testquestions){
               res.json({
                   success : false,
                   message : 'Invalid test id.'
               })

           }
           else{
               res.json({
                   success : true,
                   message : 'Success',
                   data : Testquestions.questions
               })

           }
       }

   })

}

let Answersheet = (req,res,next)=>{
    var userid = req.body.userid;
    var testid = req.body.testid;
    var p1= TraineeEnterModel.find({_id:userid,testid:testid});
    var p2 = TestPaperModel.find({_id:testid,testbegins : true, testconducted : false});
    
    Promise.all([p1,p2]).then((info)=>{
        if(info[0].length && info[1].length){
            AnswersheetModel.find({userid:userid,testid:testid}).then((data)=>{
                if(data.length){
                    res.json({
                        success : true,
                        message : 'Answer Sheet already exists!',
                        data : data
                    })
                }
                else{ 
                    var qus = info[1][0].questions;
                    var answer = qus.map((d,i)=>{
                        return({
                            questionid:d,
                            chosenOption:[],
                            userid:userid
                        })
                    })
                    AnswersModel.insertMany(answer,(err,ans)=>{
                        if(err){
                            console.log(err);
                            res.status(500).json({
                                success : false,
                                message : "Unable to create Answersheet!"
                            })
                        }else{
                            var startTime = new Date();
                            var tempdata = AnswersheetModel({
                                startTime:startTime,
                                questions : qus,
                                answers:ans,
                                testid:testid,
                                userid:userid
                            })
                            tempdata.save().then((Answersheet)=>{
                                res.json({
                                    success : true,
                                    message : 'Test has started!'
                                })

                            }).catch((error)=>{
                                res.status(500).json({
                                    success : false,
                                    message : "Unable to fetch details"
                                })
                            })
                        }
                    })
                }
            })
        }
        else{
            res.json({
                success : false,
                message :'Invalid URL'
            })
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Unable to fetch details"
        })
    })
}

let flags = (req,res,next)=>{
    var testid = req.body.testid;
    var traineeid = req.body.traineeid;
    const p1 = AnswersheetModel.findOne({userid : traineeid,testid : testid},{_id : 1,startTime  :1,completed : 1});
    const p2 = TraineeEnterModel.findOne({_id : traineeid , testid : testid},{_id : 1});
    const p3 = TestPaperModel.findById(testid,{testbegins : 1, testconducted : 1,duration : 1});
    var present = new Date();

    Promise.all([p1,p2,p3]).then((info)=>{
        console.log(info)
        if(info[1]===null){
            res.json({
                success : false,
                message : 'Invalid URL!'
            })
        }else{
            var startedWriting = false;
            var pending=null;
            if(info[0]!==null){
                startedWriting = true;
                pending = info[2].duration*60 - ((present - info[0].startTime)/(1000))
                if(pending<=0){
                    AnswersheetModel.findOneAndUpdate({userid : traineeid,testid : testid},{completed : true}).then((result)=>{
                        res.json({
                            success : true,
                            message : 'Successfull',
                            data : {
                                testbegins : info[2].testbegins,
                                testconducted:info[2].testconducted,
                                startedWriting:startedWriting,
                                pending : pending,
                                completed : true
                            }
                        })
                    }).catch((error)=>{
                        res.status(500).json({
                            success : false,
                            message : "Unable to fetch details"
                        })
                    })
                }else{
                    res.json({
                        success : true,
                        message : 'Successfull',
                        data : {
                            testbegins : info[2].testbegins,
                            testconducted:info[2].testconducted,
                            startedWriting:startedWriting,
                            pending : pending,
                            completed : info[0].completed
                        }
                    })
                }
            }
            else{
                res.json({
                    success : true,
                    message : 'Successfull',
                    data : {
                        testbegins : info[2].testbegins,
                        testconducted:info[2].testconducted,
                        startedWriting:startedWriting,
                        pending : pending,
                        completed : false
                    }
                })

            }
            
            
        }
        
        
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Unable to fetch details"
        })
    })

}

let TraineeDetails = (req,res,next)=>{
    var traineeid = req.body._id;
    TraineeEnterModel.findById(traineeid,{name:1,emailid:1,contact:1}).then((info)=>{
        if(info){
            res.json({
                success : true,
                message : 'Trainee details',
                data : info
            })
        }else{
            res.json({
                success : false,
                message : 'This trainee does not exists'
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            success : false,
            message : "Unable to fetch details"
        })
    })
}

let chosenOptions = (req,res,next)=>{
    var testid = req.body.testid;
    var userid = req.body.userid;
    AnswersheetModel.findOne({testid : testid,userid : userid},{answers : 1})
    .populate('answers')
    .exec(function(err,answersheet){
        if(err){
            res.json({
                success : false,
                message : 'Answersheet does not exist'
            })
            
        }else{
            res.json({
                success : true,
                message : 'Chosen Options',
                data : answersheet
            })
        }
    })

}

let UpdateAnswers = (req,res,next)=>{
    var testid = req.body.testid;
    var userid = req.body.userid;
    var questionid = req.body.qid;
    var newAnswer = req.body.newAnswer;
    const p1 = TestPaperModel.findById(testid,{duration : 1});
    const p2 = AnswersheetModel.findOne({testid : testid,userid:userid,completed : false},{_id:1,startTime:1});
    
    var present = new Date();
    Promise.all([p1,p2])
    .then((info)=>{
        if(info[1]){
            var pending=null;
            pending = info[0].duration*60 - ((present - info[1].startTime)/(1000))
            if(pending>0){
                AnswersModel.findOneAndUpdate({questionid : questionid,userid:userid},{chosenOption : newAnswer}).then((info)=>{
                    console.log(info)
                    if(info){
                        res.json({
                            success : true,
                            message : 'Answer Updated',
                            data : info
                        })
                    }else{
                        res.json({
                            success : false,
                            message : 'Question is required!'
                        })
                    }
                   
                }).catch((error)=>{
                    console.log(error)
                    res.status(500).json({
                        success : false,
                        message : "Error occured!"
                    })
                })
            }else{
                AnswersheetModel.findByIdAndUpdate({testid : testid,userid:userid},{completed : true}).then(()=>{
                    res.json({
                        success : false,
                        message : 'Time is up!'
                    })
                }).catch((error)=>{
                    res.status(500).json({
                        success : false,
                        message : "Error occured!"
                    })
                })
            }   
        }else{
            res.json({
                success : false,
                message : 'Unable to update answer'
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            success : false,
            message : "Error occured!"
        })
    })
}

let EndTest = (req,res,next)=>{
    var testid = req.body.testid;
    var userid = req.body.userid;
    AnswersheetModel.findOneAndUpdate({testid:testid,userid:userid},{completed : true}).then((info)=>{
        if(info){
            res.json({
                success : true,
                message : 'Your answers have been submitted'
            })
        }else{
            res.json({
                success : false,
                message : 'Unable to submit answers!'
            })
        }
    }).catch((error)=>{
        res.status(500).json({
            success : false,
            message : "Error occured!"
        })
    })
}
 
let getQuestion = (req,res,next)=>{
    
        let qid = req.body.qid;
        
        QuestionModel.find({_id : qid , status : 1},{body : 1, options : 1,quesimg : 1})
        .populate({ 
                path: 'options',
                model: options,
                select : {'optbody' : 1,'optimg' : 1}
            
    })
        .exec(function (err, question) {
            if (err){
                console.log(err)
                res.status(500).json({
                    success : false,
                    message : "Unable to fetch data"
                })
            }
            else{
                if(question.length===0){
                    res.json({
                        success : false,
                        message : `No such question exists`,
                    })
                }
                else{
                    res.json({
                        success : true,
                        message : `Success`,
                        data : question
                    })
                }   
            }
        })        
    }


module.exports = {traineeenter,feedback,checkFeedback,resendmail,correctAnswers,Answersheet,flags,chosenOptions,TraineeDetails,Testquestions,UpdateAnswers,EndTest,getQuestion}