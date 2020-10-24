const express = require('express');
const melangeController = require('./../controllers/melangeController');
const authController = require('./../controllers/authController');

const router = express.Router();


router.use(authController.protect);


router.post('/create', melangeController.createMelange);
router.route('/:id').get(melangeController.getMelange);
router.route('/my').get(melangeController.getMyMelanges);
router.route('/').get(melangeController.getAllMelanges);
router.route('/:id').get(melangeController.getMelange);


module.exports = router; 