// Importing thing we need
const publicServices = require("../services/publicServices");
// Functions
const getDocsController = async(req, res) => {
    const data = await publicServices.getDocsService();
    if (data.result.length != 0) {
        res.send({
            status: 200,
            error: null,
            message: "All docs",
            docs: data.result,
        });
    } else {
        res.send({
            status: 404,
            error: "Empty",
            errorMessage: "Docs not found",
        });
    }
};
const getDocByIdController = async(req, res) => {
    const id = req.params.id;
    const data = await publicServices.getDocByIdService(id);
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
};
const getUserProfileByIdController = async(req, res) => {
    const userid = req.params.userid;
    try {
        const userDocs = await publicServices.getUserDocsByIdService(userid);
        const userData = await publicServices.getUserDataByIdService(userid);
        if (userData.result.length != 0) {
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
        } else {
            res.send({
                status: 404,
                error: "User",
                errorMessage: "User not found",
            });
        }
    } catch (e) {
        console.log(e.message);
        console.log(e);
        res.send({
            status: 500,
            error: "Server",
            errorMessage: "Internel server",
        });
    }
};
// Exporting functions
module.exports = {
    getDocsController,
    getDocByIdController,
    getUserProfileByIdController,
};