// Importing thing we need
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const authenticateServices = require("../services/authenticateServices");
const jwt = require("jsonwebtoken");
const createResponseObject = require('../reusable/createResponseObject')
    // Functions
    // This function controller signup route 
const signupController = async(req, res) => {
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
        const exits = await authenticateServices.checkUserExistService(useremail);
        // Throw error
        if (exits.result.length != 0) throw "User exist";
        // Hashing user password
        const hashedPassword = await bcrypt.hash(userpassword, 10);
        // Throw error
        if (!hashedPassword) throw "Server";
        // Calling insert user service 
        await authenticateServices.insertNewUserServices(
            username,
            useremail,
            hashedPassword
        );
        // Calling check if user service
        const user = await authenticateServices.checkUserExistService(useremail);
        // Creating access token
        const token = jwt.sign(useremail, process.env.SECRET);
        // Sending response to client
        res.send(createResponseObject(token, "New user added to database", user));
    } catch (e) {
        // Run if invalid email
        if (e == "Invalid email") {
            res.send({
                status: 400,
                error: "Email",
                errorMessage: "Please enter valid email",
            });
        }
        // Run if user exist
        else if (e == "User exist") {
            res.send({
                status: 409,
                error: "Email",
                errorMessage: "User already exits",
            });
        }
        // Run if server error
        else {
            res.send({
                status: 500,
                error: "Server",
                errorMessage: "Internel server error",
            });
        }
    }
};
// This function controller login route 
const loginController = async(req, res) => {
    // Extracting user info from req body
    const useremail = req.body.email;
    const userpassword = req.body.password;
    try {
        //  Validating email
        const validEmail = validator.validate(useremail);
        // Throw error
        if (!validEmail) throw "Invalid email";
        // Calling check if user service
        const user = await authenticateServices.checkUserExistService(useremail);
        if (user.result.length == 0) throw "User does not exist";
        // Verifying user password
        const validPassword = await bcrypt.compare(
            userpassword,
            user.result[0].userpassword
        );
        // Throw error
        if (!validPassword) throw "Password does not match";
        // Creating access token
        const token = jwt.sign(useremail, process.env.SECRET);
        // Send response to client
        res.send(createResponseObject(token, "User logged in", user));
    } catch (e) {
        console.log(e);
        // Run if invalid email
        if (e == "Invalid email") {
            res.send({
                status: 401,
                error: "Email",
                errorMessage: e,
            });
        }
        // Run if user does not exist
        else if (e == "User does not exist") {
            res.send({
                status: 401,
                error: "Email",
                errorMessage: e,
            });
        }
        // Run if password does not match
        else if (e == "Password does not match") {
            res.send({
                status: 401,
                error: "Password",
                errorMessage: e,
            });
        }
        // Run if server error
        else {
            res.send({
                status: 500,
                error: "Server",
                errorMessage: "Interner server error",
            });
        }
    }
};
// Exporting functions
module.exports = {
    signupController,
    loginController,
};