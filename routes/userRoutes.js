// Importing thing we need
const express = require("express");
const userController = require("../controllers/userController");
// Creating router
const router = express.Router();
// Routes
// Get routes
router.get("/like", userController.addLikeToDocByIdController);
router.get("/liked/:id", userController.checkIfLikedController);
router.get("/getuserdata/:id", userController.getUserDataController);
// Post routes
router.post("/checktoken", userController.checkTokenController);
router.post("/adddoc", userController.insertDocController);
// Exporting router
module.exports = router;