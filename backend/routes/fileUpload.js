const multer = require('multer');
var express = require("express");
var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    }
});
var upload = multer({storage: storage});

router.post('/', upload.single('file'),(req,res,next)=>{
    console.log(req.file);
    res.json({
        success:true,
        message:'File uploaded successfully',
        link:`uploads/${req.file.filename}`
    })
});



module.exports=router;



