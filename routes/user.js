// Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user.js")
const auth = require("../auth.js");

const {errorHandler} = auth;

const router = express.Router();

// User registration route
router.post("/register", userController.registerUser);

// User login route
router.post("/login", userController.loginUser);

module.exports = router;