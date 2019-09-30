//view all subjects and single subject
let SubjectModel = require("../models/subject");


let createEditsubject = (req,res,next)=>{
    var _id = req.body._id || null;
    if(req.user.type==='ADMIN'){
    req.check('topic', `invalid topic`).notEmpty();
    var errors = req.validationErrors()
    if(errors){
        res.json({
            success : false,
            message : 'Invalid inputs',
            errors : errors
        })
    }
    else {
        var topic =  req.body.topic;
        if(_id!=null){
            SubjectModel.findOneAndUpdate({
                _id : _id,

            },
            {
                topic : topic,
            }).then(()=>{
                res.json({
                    success: true,
                    message :  "Subject name has been changed"
                })
            }).catch((err)=>{
                res.status(500).json({
                    success : false,
                    message : "Unable to change Subject name"
            })
        })

    }
        else{   
            SubjectModel.findOne({topic : topic}).then((info)=>{
                if(!info){
                    var tempdata = SubjectModel({
                        topic : topic,
                        createdBy : req.user._id
                    })
                    tempdata.save().then(()=>{
                        res.json({
                            success : true,
                            message : `New subject created successfully!`
                        })
                    }).catch((err)=>{
                        console.log(err);
                        res.status(500).json({
                            success : false,
                            message : "Unable to create new subject!"
                        })
                    })
                }
                else{
                    res.json({
                        success : false,
                        message : `This subject already exists!`
                    })
                }   

            })
        }
    }
  }


    else{
        res.status(401).json({
            success : false,
            message : "Permissions not granted!"
        })

    }
}




            

let getAllSubjects = (req,res,next)=>{
    SubjectModel.find({status : 1},{createdAt: 0, updatedAt : 0})
    .populate('createdBy', 'name')
    
    .exec(function (err, subject) {
        if (err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
            })
        }
        else{
            res.json({
                success : true,
                message : `Success`,
                data : subject
            })   
        }
    })        

}

let getSingleSubject = (req,res,next)=>{
    let id = req.params._id;
    console.log(id);
    SubjectModel.find({_id: id},{createdAt: 0, updatedAt : 0,status : 0})
    .populate('createdBy', 'name')
    .exec(function (err, subject) {
        if (err){
            console.log(err)
            res.status(500).json({
                success : false,
                message : "Unable to fetch data"
            })
        }
        else{
            res.json({
                success : true,
                message : `Success`,
                data : subject
            })   
        }
    })        
}

    module.exports = { createEditsubject ,getAllSubjects, getSingleSubject}
    
