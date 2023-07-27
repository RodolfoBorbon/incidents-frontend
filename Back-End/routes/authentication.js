//Back-End/routes/authentication.js

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var authController = require("../controllers/authentication");// Import your controllers


// Registration route
router.post("/registerUser", authController.register);

// Login route
router.post("/login", passport.authenticate("local"), authController.login);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;