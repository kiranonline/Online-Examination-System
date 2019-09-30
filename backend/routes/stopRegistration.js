var express = require("express");
var router = express.Router();

var stopRegistraion = require("../services/registrationlink");

router.post("/registration/stop",stopRegistraion.stopRegistration)
router.post('/result/download',stopRegistraion.Download)
router.post('/get/feedbacks',stopRegistraion.getFeedBack)
module.exports = router;
