var TraineeEnterModel = require("../models/trainee");
var TestPaperModel = require("../models/testpaper");
var QuestionModel = require("../models/questions");
var options = require("../models/option");
var AnswersheetModel = require("../models/answersheet");
var AnswersModel = require("../models/answers");
var subResultsModel = require("../models/subResults");
var ResultModel = require("../models/results");

let generateResults = (req,res,next)=>{
    var userid = req.body.userid;
    var testid = req.body.testid;
    
    gresult(userid,testid).then((result)=>{
        console.log(result)
        res.json({
            success:true,
            message:"Result generated successfully",
            result:result
        })
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Unable to generate result",
        })
    })
}



let gresult = (uid,tid)=>{
    return new Promise((resolve,reject)=>{
        const ansMap = ['A','B','C','D','E'];
        ResultModel.findOne({userid : uid,testid: tid})
        .populate('result')
        .exec(function(err,results){
            if(err){
                console.log(err);
                reject(err)
            }else{
                if(!results){
                    AnswersheetModel.findOne({userid:uid,testid:tid,completed : true},{testid:0,userid:0,startTime:0,completed:0})
                    .populate({ path: 'questions',
                        select:{
                            'explanation':1,
                            'weightage':1,
                            'body': 1
                        },
                        populate: {  
                            path: 'options',
                            model: options,
                            select:{
                                'isAnswer':1
                            }
                        }
                    })
                    .populate('answers','questionid chosenOption')
                    .exec(function(err,answersheet){
                        if(err){
                            console.log(err);
                            reject(err)
                        }else{
                            if(!answersheet){
                                reject(new Error("invalid Inputs"))
                            }
                            else{
                                var Score = 0;
                                var questions = answersheet.questions;
                                var answers = answersheet.answers;
                                let subResults=questions.map((d,i)=>{
                                    var ans =answers[i].chosenOption;
                                    var correctAns = []
                                    var givenAns = []
                                    d.options.map((dd,ii)=>{
                                        if(dd.isAnswer){
                                            correctAns.push(ansMap[ii])
                                        }
                                        for(var m=0;m<ans.length;m++){
                                            if(String(ans[m])==String(dd._id)){
                                                givenAns.push(ansMap[ii])
                                            }
                                        }
                                    })
                                    var l1 = correctAns.length;
                                    var l2 = givenAns.length;
                                    var iscorrect = false;
                                    if(l1==l2){
                                            var count = 0;
                                        for(var p=0;p<l1;p++){
                                            for(var q=0;q<l2;q++){
                                                if(correctAns[p]==givenAns[q]){
                                                    count++;
                                                    break;
                                                }
                        
                                            }
                                        }
                                        if(count==l1){
                                            iscorrect = true;
                                            Score+=d.weightage
                                        }
                                    }
                                    var tmp={
                                        qid : d._id,
                                        weightage:d.weightage,
                                        correctAnswer:correctAns,
                                        givenAnswer:givenAns,
                                        explanation:d.explanation,
                                        iscorrect : iscorrect
                                    }
            
                                    return(tmp)
                                })
                                subResultsModel.insertMany(subResults,(err,subres)=>{
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        var tempdata = ResultModel({
                                            testid : tid,
                                            userid:uid,
                                            answerSheetid : answersheet._id,
                                            result : subres,
                                            score:Score
                                        });
                                        tempdata.save().then((data)=>{
                                            resolve(data)
                                        }).catch((err)=>{
                                            reject(err)
                                        })
                                    }
                                })
                            }
                        }
                    })
                }else{
                    resolve(results)
                }

            }
        })   
    })
}

module.exports = {generateResults,gresult}