// Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user.js")
const auth = require("../auth.js");

const {errorHandler, verify} = auth;

const router = express.Router();

// User registration route
router.post("/register", userController.registerUser);

// User login route
router.post("/login", userController.loginUser);

// Retrieve user details route
router.get("/details", verify, userController.details);

module.exports = router;