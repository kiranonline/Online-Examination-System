
let getdomain = async(req,res,next)=>{
    var testid='1234';
    var userid='7899';
    res.json({url:`${req.protocol + '://' + req.get('host')}/trainee/taketest?testid=${testid}&traineeid=${userid}`});
}
module.exports = {getdomain};

