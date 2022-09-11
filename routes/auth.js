const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const authMiddleWare = require("../middlewares/AuthMiddleWares");
router.post("/", authMiddleWare.checkUser);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
