const express = require("express");
const router = express.Router();

// Import the user controller
const userController = require("../controllers/userController");

// Route for user registration
router.post("/register", userController.registerUser);

// Route for user login
router.post("/login", userController.loginUser);

// Route for user profile update
router.put("/profile/:userId", userController.updateUserProfile);

module.exports = router;
