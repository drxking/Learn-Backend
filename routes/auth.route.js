const express = require("express")
const authController = require("../controllers/auth.controller")
let router = express.Router()

router.get("/login",authController.getLogin)

router.get("/signup",authController.getSignUp)

router.post("/signup",authController.postSignup)


module.exports = router;