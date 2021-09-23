// Importing thing we need
const express = require("express");
const publicController = require("../controllers/publicController");
// Creating router
const router = express.Router();
// Routes
router.get("/getdata", publicController.getDocsController);
router.get("/getdata/:id", publicController.getDocByIdController);
// Exporting router
module.exports = router;