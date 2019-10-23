var express = require("express");
var router = express.Router();
var userservice  = require("../services/user");

router.get('/details',userservice.userdetails);



module.exports=router;