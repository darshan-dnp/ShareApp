const express = require("express");
const { loginUser, signupUser } = require("../controllers/usersController");

const router = express.Router();

//Login
router.post("/login", loginUser);

//Sign Up
router.post("/signup", signupUser);

module.exports = router;
