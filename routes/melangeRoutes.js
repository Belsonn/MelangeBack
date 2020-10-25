const express = require('express');
const melangeController = require('./../controllers/melangeController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.use(authController.protect);


router.post('/create', melangeController.createMelange);
router.post("/createTempUser", melangeController.createTemporaryUser);
router.route("/join").post(melangeController.joinMelange);
router.route('/my').get(melangeController.getMyMelanges);
router.route('/').get(melangeController.getAllMelanges);
router
  .route("/:id")
  .get(melangeController.getMelange)
  .delete(melangeController.deleteMelange);


module.exports = router; 