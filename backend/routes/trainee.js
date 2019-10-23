var express = require("express");
var router = express.Router();

var trainee = require("../services/trainee");
router.post('/enter',trainee.traineeenter);
router.post('/feedback',trainee.feedback);
router.post('/resend/testlink',trainee.resendmail);
router.post('/correct/answers',trainee.correctAnswers);
router.post('/answersheet',trainee.Answersheet);
router.post('/flags',trainee.flags);
router.post('/details',trainee.TraineeDetails);
router.post('/paper/questions',trainee.Testquestions);
router.post('/chosen/options',trainee.chosenOptions);
router.post('/update/answer',trainee.UpdateAnswers);
router.post('/end/test',trainee.EndTest);
router.post('/get/question',trainee.getQuestion);
router.post('/feedback/status',trainee.checkFeedback);





module.exports = router;