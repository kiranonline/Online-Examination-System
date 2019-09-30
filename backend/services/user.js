let userdetails = (req,res,next)=>{
    res.json({
        success : true,
        message : 'successfull',
        user: {
            name : req.user.name,
            type: req.user.type,
            _id : req.user._id,
            emailid : req.user.emailid,
            contact : req.user.contact
        }
    })
}

module.exports={userdetails}