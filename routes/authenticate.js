// Importing thing we need
const express = require("express");
const autenticateController = require("../controllers/authenticateController");
// Creating router
const router = express.Router();
// Routes
router.post("/signup", autenticateController.signupController);
router.post("/login", autenticateController.loginController);
// Exporting router
module.exports = router;