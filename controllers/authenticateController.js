// Importing thing we need
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const authenticateServices = require("../services/authenticateServices");
const jwt = require("jsonwebtoken");
const createResponseObject = require("../helpers/createResponseObject");
const errorHandler = require("../helpers/errorHandler");
// Functions
// This function controller signup route
const signup = async(req, res) => {
    // Extracting user info from req body
    const username = req.body.name;
    const useremail = req.body.email;
    const userpassword = req.body.password;
    try {
        //  Validating email
        const validEmail = validator.validate(useremail);
        // Throw error
        if (!validEmail) throw "Invalid email";
        // Calling check if user service
        const exits = await authenticateServices.checkUserExis(useremail);
        // Throw error
        if (exits.result.length != 0) throw "User exist";
        // Hashing user password
        const hashedPassword = await bcrypt.hash(userpassword, 10);
        // Throw error
        if (!hashedPassword) throw "Server";
        // Calling insert user service
        await authenticateServices.insertNewUser(
            username,
            useremail,
            hashedPassword
        );
        // Calling check if user service
        const user = await authenticateServices.checkUserExis(useremail);
        // Creating access token
        const token = await jwt.sign(useremail, process.env.SERVER_SECRET);
        // Sending response to client
        res.send(createResponseObject(token, "New user added to database", user));
    } catch (e) {
        errorHandler(e, res);
    }
};
// This function controller login route
const login = async(req, res) => {
    // Extracting user info from req body
    const useremail = req.body.email;
    const userpassword = req.body.password;
    try {
        //  Validating email
        const validEmail = validator.validate(useremail);
        // Throw error
        if (!validEmail) throw "Invalid email";
        // Calling check if user service
        const user = await authenticateServices.checkUserExis(useremail);
        if (user.result.length == 0) throw "User does not exist";
        // Verifying user password
        const validPassword = await bcrypt.compare(
            userpassword,
            user.result[0].userpassword
        );
        // Throw error
        if (!validPassword) throw "Password does not match";
        // Creating access token
        const token = await jwt.sign(useremail, process.env.SERVER_SECRET);
        // Send response to client
        res.send(createResponseObject(token, "User logged in", user));
    } catch (e) {
        errorHandler(e, res);
    }
};
// Exporting functions
module.exports = {
    signup,
    login,
};