var express = require("express");
var router = express.Router();

var admin = require("../services/adminFunctions");

//create new Trainer
router.post('/trainer/create',admin.trainerRegister);
router.get('/trainer/details/all',admin.getAllTrainers);
router.get('/trainer/details/:_id',admin.getSingleTrainer);
router.post('/trainer/remove',admin.removeTrainer);



module.exports=router;