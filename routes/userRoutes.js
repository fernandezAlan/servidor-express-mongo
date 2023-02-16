const express = require("express");
const router = express.Router();
const authController = require("../controllers/Auth");
const { register, getUser } = require("../controllers/userControllers");
const authMiddleware = require("../midleware/authMidleware");
router.get("/", authMiddleware, getUser);
router.post("/login", authController);
router.post("/register", register);

module.exports = router;
