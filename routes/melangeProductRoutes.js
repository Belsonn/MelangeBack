const express = require('express');
const melangeProductController = require('./../controllers/melangeProductController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post('/create', melangeProductController.createMelangeProduct);
router.post('/update', melangeProductController.updateMelangeProduct)
router.route("/:id").get(melangeProductController.getMelangeProduct).delete(melangeProductController.deleteMelangeProduct);
router.route("/").get(melangeProductController.getAllMelangeProducts);

module.exports = router;
