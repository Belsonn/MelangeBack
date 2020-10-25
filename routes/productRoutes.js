const express = require("express");
const productController = require("./../controllers/productController");
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.protect);

router.route("/find").post(productController.findOne);
router.route("/findPrice").post(productController.findPrice);
router.route('/myProducts').get(productController.getMyProducts);
router.post("/create", productController.createProduct);
router.get("/", productController.getProducts);

router
	.route("/:id")
	.get(productController.getProduct)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;