// Importing thing we need
const jwt = require("jsonwebtoken");
const userServices = require("../services/userServices");
const imageDataURI = require("image-data-uri");
const createResponseObject = require("../helpers/createResponseObject");
const errorHandler = require("../helpers/errorHandler");
// Functions
// Check user token controller
const checkToken = async(req, res) => {
    // Extracting user token from req.body
    const token = req.body.token;
    try {
        // Verifying user token
        const verifyUser = jwt.verify(token, process.env.SECRET);
        // Getting user data of given email
        const user = await userServices.checkUserExist(verifyUser);
        if (user.result.length == 0) throw "User";
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "Valid user",
            isUser: verifyUser,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Insert new doc controller
const insertDoc = async(req, res) => {
    // Extracting doc info from req body
    const token = req.body.token;
    const tags = req.body.tags;
    const docTitle = req.body.docTitle;
    const markdown = req.body.markdown;
    try {
        if ((tags, docTitle, markdown, token == "")) throw "Some field is missing";
        // Verifying user token
        const verifyUser = jwt.verify(token, process.env.SECRET);
        // Getting user data
        const user = await userServices.checkUserExist(verifyUser);
        // Checking if user exist
        if (user.result[0].length == 0) throw "User";
        const docInfo = { docTitle, tags, markdown };
        // Calling insert doc service
        const docAdded = await userServices.insertDoc(
            user.result[0].id,
            verifyUser,
            docInfo
        );
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "New doc added to database",
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Add like controller
const addLikeToDocById = async(req, res) => {
    // Extracting doc info from query
    const docid = req.query.id;
    const token = req.header("authorization");
    try {
        // verifying user token
        const useremail = jwt.verify(token, process.env.SECRET);
        // Checking if user exist
        const user = await userServices.checkUserExist(useremail);
        // Throw error
        if (user.result.length == 0) throw "User";
        const userid = user.result[0].id;
        // Callign check if liked service
        const ifLiked = await userServices.checkIfUserLiked(userid, docid);
        // Checking user liked this doc
        if (ifLiked.result.length == 0) {
            // Calling add like service
            const data = await userServices.addLike(userid, docid);
            if (data.reject == false) {
                res.send({
                    status: 200,
                    error: null,
                    message: "Like added to doc",
                });
            }
        } else {
            // Calling delete like service
            const data = await userServices.deletLike(userid, docid);
            if (data.reject == false) {
                res.send({
                    status: 200,
                    error: null,
                    message: "Like deleted to doc",
                });
            }
        }
    } catch (e) {
        errorHandler(e, res);
    }
};
// Check if like controller
const checkIfLiked = async(req, res) => {
    // Extracting user info from query & params
    const userid = req.params.id;
    const docids = req.query.docids;
    try {
        //   Caling check if like service
        const data = await userServices.checkIfUserLiked(userid, docids);
        if (data.result.length == 0) throw "Don't like";
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "liked docs ids",
            liked: data.result,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Get user data controller
const getUserData = async(req, res) => {
    // Extracting user info from params
    const userid = req.params.id;
    const token = req.header("authorization");
    try {
        // verifying user token
        jwt.verify(token, process.env.SECRET);
        // Calling get user data service
        const data = await userServices.getUserData(userid);
        if (data.result.length == 0) throw "Empty";
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "All doc data",
            docs: data.result,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Edit user data controller
const editprofile = async(req, res) => {
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
                    imgBase64String = `http://${req.hostname}:${
            process.env.PORT || 3000
          }${imgSrc}`;
                });
        }
        // Verifying user token
        const useremail = await jwt.verify(token, process.env.SECRET);
        // Checking if user exist
        const user = await userServices.checkUserExist(useremail);
        // Throw error
        if (user.result.length == 0) throw "User";
        const userid = user.result[0].id;
        // Calling edit profile service
        await userServices.editProfile(userid, userNewData, imgBase64String);
        // Checking if user exist
        const updatedUser = await userServices.checkUserExist(useremail);
        // Sending response to client
        res.send(createResponseObject(token, "Profile edit", updatedUser));
    } catch (e) {
        errorHandler(e, res);
    }
};
// Delete doc controller
const deleteDoc = async(req, res) => {
    // Extracting data from header query
    const token = req.header("authorization");
    const docid = req.query.id;
    try {
        if (!docid || docid == "null") throw "Docid not define";
        // verifying user token
        const useremail = jwt.verify(token, process.env.SECRET);
        // Checking if user exist
        const user = await userServices.checkUserExist(useremail);
        // Throw error
        if (user.result.length == 0) throw "User";
        // Calling delete doc service
        const deleted = await userServices.deleteDoce(user.result[0].id, docid);
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "Doc deleted",
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Get doc controller
const getdoc = async(req, res) => {
    // Extracting docid & token from req
    const docid = req.params.docid;
    const token = req.header("authorization");
    try {
        if (!docid || docid == "null") throw "Docid not define";
        // verifying user token
        const useremail = jwt.verify(token, process.env.SECRET);
        // Calling get doc service
        const doc = await userServices.getDoc(docid);
        // Sending response to client
        if (doc.result.length == 0) throw "Empty";
        res.send({
            status: 200,
            error: null,
            message: "doc data",
            doc: doc.result,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Edit doc data controller
const editDoc = async(req, res) => {
    // Extracting doc info from req
    const token = req.body.token;
    const docid = req.query.docid;
    const tags = req.body.tags;
    const docTitle = req.body.docTitle;
    const markdown = req.body.markdown;
    try {
        if ((tags, docTitle, markdown, token == "")) throw "Some field is missing";
        // Verifying user token
        const verifyUser = jwt.verify(token, process.env.SECRET);
        // Getting user data
        const user = await userServices.checkUserExist(verifyUser);
        // Checking if user exist
        if (user.result[0].length == 0) throw "User";
        const docInfo = { docTitle, tags, markdown };
        // Calling insert doc service
        const docAdded = await userServices.editDoc(docid, docInfo);
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "Doc edit",
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
// Exporting functions
module.exports = {
    checkToken,
    insertDoc,
    addLikeToDocById,
    checkIfLiked,
    getUserData,
    editprofile,
    deleteDoc,
    getdoc,
    editDoc,
};