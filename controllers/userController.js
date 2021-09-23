const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");
// Functions
const checkTokenController = async(req, res) => {
    const token = req.body.token;
    try {
        const verifyUser = await jwt.verify(token, process.env.SECRET);
        const user = await userServices.checkUserExistService(verifyUser);
        if (user.result.length == 0) {
            res.send({
                status: 401,
                error: "Unauthorized",
                errorMessage: "Invalid signature",
            });
        } else {
            res.send({
                status: 200,
                error: null,
                message: "Valid user",
                isUser: verifyUser,
            });
        }
    } catch (e) {
        res.send({
            status: 401,
            error: "Unauthorized",
            errorMessage: "Invalid signature",
        });
    }
};
const insertDocController = async(req, res) => {
    const token = req.body.token;
    const tags = req.body.tags;
    const docTitle = req.body.docTitle;
    const markdown = req.body.markdown;
    if ((tags, docTitle, markdown, token != "")) {
        const verifyToken = await jwt.verify(
            token,
            process.env.SECRET,
            async(err, useremail) => {
                if (err) {
                    res.send({
                        status: 401,
                        error: "Not authorize",
                        errorMessage: "User is not authorize",
                    });
                } else {
                    const user = await userServices.checkUserExistService(useremail);
                    const id = user.result[0].id;
                    const docInfo = {
                        docTitle,
                        tags,
                        markdown,
                    };
                    const docAdded = await userServices.insertDocService(
                        id,
                        useremail,
                        docInfo
                    );
                    if (docAdded != "error") {
                        res.send({
                            status: 200,
                            error: null,
                            message: "New doc added to database",
                        });
                    } else {
                        res.send({
                            status: 500,
                            error: "Server",
                            errorMessage: "Internel server error",
                        });
                    }
                }
            }
        );
    } else {
        res.send({
            status: 400,
            error: "Missing",
            errorMessage: "Some field are missing",
        });
    }
};
const addLikeToDocByIdController = async(req, res) => {
    const docid = req.query.id;
    const token = req.header("authorization");
    try {
        // verifying user token
        const useremail = jwt.verify(token, process.env.SECRET);
        // Checking if user exist
        const user = await userServices.checkUserExistService(useremail);
        if (user.result.length != 0) {
            const userid = user.result[0].id;
            const ifLiked = await userServices.checkIfUserLikedService(userid, docid);
            if (ifLiked.result.length == 0) {
                const data = await userServices.addLikeService(userid, docid);
                if (data.reject == false) {
                    res.send({
                        status: 200,
                        error: null,
                        message: "Like added to doc",
                    });
                }
            } else {
                const data = await userServices.deletLikeService(userid, docid);
                if (data.reject == false) {
                    res.send({
                        status: 200,
                        error: null,
                        message: "Like deleted to doc",
                    });
                }
            }
        } else {
            res.send({
                status: 401,
                error: "Unauthurize",
                errorMessage: "User does not exists",
            });
        }
    } catch (e) {
        console.log(e);
        if (e.message == "invalid algorithm") {
            res.send({
                status: 401,
                error: "Unauthurize",
                errorMessage: "User token is not valid",
            });
        } else {
            res.send({
                status: 500,
                error: "Server",
                errorMessage: "Internel server error",
            });
        }
    }
};
const checkIfLikedController = async(req, res) => {
    const userid = req.params.id;
    const docids = req.query.docids;
    try {
        const data = await userServices.checkIfUserLikedService(userid, docids);
        if (data.result.length != 0) {
            res.send({
                status: 200,
                error: null,
                message: "liked docs ids",
                liked: data.result,
            });
        } else {
            res.send({
                status: 200,
                error: "Not Liked",
                errorMessage: "User do not any doc",
            });
        }
    } catch (e) {}
};
const getUserDataController = async(req, res) => {
    const userid = req.params.id;
    const token = req.header("authorization");
    try {
        // verifying user token
        const useremail = jwt.verify(token, process.env.SECRET);
        const data = await userServices.getUserDataService(userid);
        if (data.result.length != 0) {
            res.send({
                status: 200,
                error: null,
                message: "All doc data",
                docs: data.result,
            });
        } else {
            res.send({
                status: 404,
                error: "Empty",
                errorMessage: "Docs not found",
            });
        }
    } catch (e) {
        console.log(e);
        if (e.message == "invalid algorithm") {
            res.send({
                status: 401,
                error: "Unauthurize",
                errorMessage: "User token is not valid",
            });
        } else {
            res.send({
                status: 500,
                error: "Server",
                errorMessage: "Internel server error",
            });
        }
    }
};
// Exporting functions
module.exports = {
    checkTokenController,
    insertDocController,
    addLikeToDocByIdController,
    checkIfLikedController,
    getUserDataController,
};