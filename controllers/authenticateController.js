// Importing thing we need
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const authenticateServices = require("../services/authenticateServices");
const jwt = require("jsonwebtoken");
// Authenticate function
const signupController = async(req, res) => {
    const username = req.body.payload.name;
    const useremail = req.body.payload.email;
    const userpassword = req.body.payload.password;
    if (username != "") {
        //  Validating email
        const validateEmail = validator.validate(useremail);
        if (validateEmail) {
            // Checking if  user is exits
            const userExits = await authenticateServices.checkUserExistService(
                useremail
            );
            if (userExits.result.length == 0) {
                // Hashing passowrd
                bcrypt.hash(userpassword, 10, async(err, hashPassword) => {
                    if (err) {
                        res.send({
                            status: 500,
                            error: "Server",
                            errorMessage: "Internel server error",
                        });
                    } else {
                        try {
                            await authenticateServices.insertNewUserServices(
                                username,
                                useremail,
                                hashPassword
                            );
                            const user = await authenticateServices.checkUserExistService(
                                useremail
                            );
                            const token = jwt.sign(useremail, process.env.SECRET);
                            res.send({
                                status: 200,
                                error: null,
                                message: "New user added to database",
                                token: token,
                                username: user.result[0].username,
                                useremail: useremail,
                                userid: user.result[0].id,
                                joined: user.result[0].joined,
                                bio: user.result[0].bio,
                                skills: user.result[0].skills,
                                profileimage: user.result[0].profileimage,
                            });
                        } catch (e) {
                            res.send({
                                status: 500,
                                error: "Server",
                                errorMessage: "Internel server error",
                            });
                        }
                    }
                });
            } else {
                res.send({
                    status: 409,
                    error: "Email",
                    errorMessage: "User already exits",
                });
            }
        } else {
            res.send({
                status: 401,
                error: "Email",
                errorMessage: "Email is not valid",
            });
        }
    } else {
        res.send({
            status: 401,
            error: "Username",
            errorMessage: "Username is empty",
        });
    }
};
const loginController = async(req, res) => {
    const useremail = req.body.payload.email;
    const userpassword = req.body.payload.password;
    const validateEmail = validator.validate(useremail);
    if (validateEmail) {
        const user = await authenticateServices.checkUserExistService(useremail);
        if (user.result.length != 0) {
            bcrypt.compare(
                userpassword,
                user.result[0].userpassword,
                (err, result) => {
                    if (err) {
                        res.send({
                            status: 500,
                            error: "Server",
                            errorMessage: "Interner server error",
                        });
                    } else if (result == false) {
                        res.send({
                            status: 401,
                            error: "Password",
                            errorMessage: "Password is not valid",
                        });
                    } else {
                        const token = jwt.sign(useremail, process.env.SECRET);
                        res.send({
                            status: 200,
                            error: null,
                            message: "New user added to database",
                            token: token,
                            username: user.result[0].username,
                            useremail: useremail,
                            userid: user.result[0].id,
                            joined: user.result[0].joined,
                            bio: user.result[0].bio,
                            skills: user.result[0].skills,
                            profileimage: user.result[0].profileimage,
                        });
                    }
                }
            );
        } else {}
    } else {
        res.send({
            status: 401,
            error: "Email",
            errorMessage: "Email is not valid",
        });
    }
};
// Exporting functions
module.exports = {
    signupController,
    loginController,
};