const express = require('express');
const melangeController = require('./../controllers/melangeController');

const router = express.Router();


router.post('/create', melangeController.createMelange);
router.route('/:id').get(melangeController.getMelange);



module.exports = router; 