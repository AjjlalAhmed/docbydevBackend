// Importing thing we need
const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connection");
// Creating app
const app = express();
// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(cors());
// Routes
app.use("/", require("./routes/routes"));
// Port
const PORT = process.env.PORT || 3000;
// Listening to server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});