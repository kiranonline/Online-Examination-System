var express = require("express");
var router = express.Router();
var login = require("../services/login");


router.post('/',login.userlogin);



module.exports=router;