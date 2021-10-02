// Importing thing we need
const express = require("express");
const autenticateController = require("../controllers/authenticateController");
const publicController = require("../controllers/publicController");
const userController = require("../controllers/userController");
const userPrefix = "/user/";
// Creating router
const router = express.Router();
// Routes

// Public routes
router.get("/getdoc", publicController.getDocs);
router.get("/getdoc/:id", publicController.getDocById);
router.get("/userprofile/:userid", publicController.getUserProfileById);

// Authenting routes
router.post("/signup", autenticateController.signup);
router.post("/login", autenticateController.login);

// User routes
router.get(`${userPrefix}like`, userController.addLikeToDocById);
router.get(`${userPrefix}liked/:id`, userController.checkIfLiked);
router.get(`${userPrefix}getuserdata/:id`, userController.getUserData);
router.get(`${userPrefix}getdoc/:docid`, userController.getdoc);
router.post(`${userPrefix}checktoken`, userController.checkToken);
router.post(`${userPrefix}adddoc`, userController.insertDoc);
router.post(`${userPrefix}editprofile`, userController.editprofile);
router.post(`${userPrefix}editdoc`, userController.editDoc);
router.delete(`${userPrefix}deletedoc`, userController.deleteDoc);
// Exporting router
module.exports = router;