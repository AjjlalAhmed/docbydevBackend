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
router.get("/getdata", publicController.getDocsController);
router.get("/getdata/:id", publicController.getDocByIdController);
router.get(
    "/userprofile/:userid",
    publicController.getUserProfileByIdController
);
// Authenting routes
router.post("/signup", autenticateController.signupController);
router.post("/login", autenticateController.loginController);
// User routes
router.get(`${userPrefix}like`, userController.addLikeToDocByIdController);
router.get(`${userPrefix}liked/:id`, userController.checkIfLikedController);
router.get(
    `${userPrefix}getuserdata/:id`,
    userController.getUserDataController
);
router.get(`${userPrefix}getdoc/:docid`, userController.getdocController);
router.post(`${userPrefix}checktoken`, userController.checkTokenController);
router.post(`${userPrefix}adddoc`, userController.insertDocController);
router.post(`${userPrefix}editprofile`, userController.editprofileController);
router.post(`${userPrefix}editdoc`, userController.editDocController);
router.delete(`${userPrefix}deletedoc`, userController.deleteDocController);
// Exporting router
module.exports = router;