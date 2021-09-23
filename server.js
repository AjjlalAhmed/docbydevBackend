// Importing thing we need
const express = require("express");
const cors = require("cors");
require("./db/connection");
require("dotenv").config();
// Creating app
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/", require("./routes/publicRoutes"));
app.use("/", require("./routes/authenticate"));
app.use("/user/", require("./routes/userRoutes"));
// Port
const PORT = process.env.PORT || 3000;
// Listening to server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});