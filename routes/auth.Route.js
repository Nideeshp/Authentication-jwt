const express = require("express");
const authcontroller = require("../controllers/auth.controller.js");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyAccessToken.js");

router.post("/register", authcontroller.register);

router.post("/login", authcontroller.login);

router.get("/home", verifyToken, authcontroller.home);

router.post("/refreshtoken", authcontroller.refreshToken);

router.delete("/logout", verifyToken, authcontroller.logout);

module.exports = router;
