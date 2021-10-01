// Importing thing we need
const publicServices = require("../services/publicServices");
// Functions
const getDocsController = async(req, res) => {
    try {
        // Getting docs data from db
        const data = await publicServices.getDocsService();
        // Checking if any docs found
        if (data.result.length == 0) throw "Empty";
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            message: "All docs",
            docs: data.result,
        });
    } catch (e) {
        // Run if docs are empty
        if (e == "Empty") {
            res.send({
                status: 404,
                error: "Empty",
                errorMessage: "Docs not found",
            });
        }
        // Run id server error
        else {
            res.send({
                status: 500,
                error: "Server",
                errorMessage: "Internel server error",
            });
        }
    }
};
const getDocByIdController = async(req, res) => {
    const id = req.params.id;
    try {
        //   Getting doc data of given id
        const data = await publicServices.getDocByIdService(id);
        // Checking is doc
        if (data.result.length == 0) throw "Empty";
        // Sending data to client
        res.send({
            status: 200,
            error: null,
            message: "All doc data",
            docs: data.result,
        });
    } catch (e) {
        // Run if doc is empt
        if (e == "Empty") {
            res.send({
                status: 404,
                error: "Empty",
                errorMessage: "Docs not found",
            });
        }
    }
};
const getUserProfileByIdController = async(req, res) => {
    // Extracting userid from params
    const userid = req.params.userid;
    try {
        //   Getting user data of given id
        const userDocs = await publicServices.getUserDocsByIdService(userid);
        //   Getting user docs of given id
        const userData = await publicServices.getUserDataByIdService(userid);
        // Throw error
        if (userData.result.length == 0) throw "User";
        // Sending response to client
        res.send({
            status: 200,
            error: null,
            docs: userDocs.result,
            username: userData.result[0].username,
            useremail: userData.result[0].useremail,
            userid: userData.result[0].id,
            joined: userData.result[0].joined,
            profession: userData.result[0].profession,
            phone: userData.result[0].phone,
            address: userData.result[0].address,
            site: userData.result[0].site,
            birthday: userData.result[0].birthday,
            gender: userData.result[0].gender,
            bio: userData.result[0].bio,
            skills: userData.result[0].skills,
            profileimage: userData.result[0].profileimage,
        });
    } catch (e) {
        //   Run if user not found
        if (e == "User") {
            res.send({
                status: 404,
                error: "User",
                errorMessage: "User not found",
            });
        }
        // Run if server error
        else {
            res.send({
                status: 500,
                error: "Server",
                errorMessage: "Internel server",
            });
        }
    }
};
// Exporting functions
module.exports = {
    getDocsController,
    getDocByIdController,
    getUserProfileByIdController,
};