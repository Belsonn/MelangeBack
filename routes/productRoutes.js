const express = require("express");
const productController = require("./../controllers/productController");

const router = express.Router();

router
.route("/:id")
.get(productController.getProduct)
.delete(productController.deleteProduct);
router.post("/create", productController.createProduct);
router.get("/", productController.getProducts);

module.exports = router;