// Importing thing we need
const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");
const imageDataURI = require("image-data-uri");
// Functions
// Check user token controller
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
// Insert new doc controller
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
// Add like controller
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
// Check if like controller
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
// Get user data controller
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
// Edit user data controller
const editprofileController = async(req, res) => {
    // Extracting user data for req body
    const token = req.body.token;
    let imgBase64String = req.body.img;
    const userNewData = {
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio,
        skills: req.body.skills,
        address: req.body.address,
        birthday: req.body.birthday,
        gender: req.body.gender,
        phone: req.body.phone,
        profession: req.body.profession,
        site: req.body.site,
    };
    try {
        // Converting base64 string image 
        if (imgBase64String.includes("data:image/")) {
            let filePath = `public/assets/uploads/profileImages/image-${Date.now()}`;
            // Returns a Promise
            await imageDataURI
                .outputFile(imgBase64String, filePath)
                .then((imgSrc) => {
                    imgSrc = imgSrc.replace(`public`, "");
                    console.log(
                        `http://${req.hostname}:${process.env.PORT || 3000}/${imgSrc}`
                    );
                    imgBase64String = `http://${req.hostname}:${
            process.env.PORT || 3000
          }${imgSrc}`;
                });
        }
        // Verifying user token
        const useremail = await jwt.verify(token, process.env.SECRET);
        const user = await userServices.checkUserExistService(useremail);
        const userid = user.result[0].id;
        const updatedUser = await userServices.editProfileService(userid, userNewData, imgBase64String)
        console.log(updatedUser);
    } catch (e) {
        console.log(e);
    }
};
// Exporting functions
module.exports = {
    checkTokenController,
    insertDocController,
    addLikeToDocByIdController,
    checkIfLikedController,
    getUserDataController,
    editprofileController,
};