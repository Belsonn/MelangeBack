const express = require('express');
const melangeProductController = require('./../controllers/melangeProductController');

const router = express.Router();

router.post('/create', melangeProductController.createMelangeProduct);
router.route("/:id").get(melangeProductController.getMelangeProduct).delete(melangeProductController.deleteMelangeProduct);
router.route("/").get(melangeProductController.getAllMelangeProducts);

module.exports = router;
