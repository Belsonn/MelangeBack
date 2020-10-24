const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router
  .route("/me")
  .get(authController.protect, userController.getMe, userController.getUser);
router
  .route("/:id")
  .get(userController.getUser)
router.route("/").get(userController.getAllUsers);

module.exports = router;