// Importing thing we need
const publicServices = require("../services/publicServices");
const errorHandler = require("../helpers/errorHandler");

// Functions
const getDocs = async(req, res) => {
    // Extracting data from query
    const category = req.query.category;
    let page = req.query.page;
    try {
        if (page == undefined && page == null && page != "Number") page = 1;
        // Creating limit of result
        const limit = 50;
        // Creating offset
        const offset = (Number(page) - 1) * limit;
        // Getting docs data from db
        const data = await publicServices.getDocs(category, limit, offset);
        // Checking if any docs found
        if (data.result.length == 0) throw "Empty";
        // Sending response to client
        res.status(200).send({
            status: 200,
            error: null,
            message: "All docs",
            docs: data.result,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
const getDocById = async(req, res) => {
    const id = req.params.id;
    try {
        //   Getting doc data of given id
        const data = await publicServices.getDocById(id);
        // Checking is doc
        if (data.result.length == 0) throw "Empty";
        // Sending data to client
        res.status(200).send({
            status: 200,
            error: null,
            message: "All doc data",
            docs: data.result,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
const getUserProfileById = async(req, res) => {
    // Extracting userid from params
    const userid = req.params.userid;
    try {
        //   Getting user data of given id
        const userDocs = await publicServices.getUserDocsById(userid);
        //   Getting user docs of given id
        const userData = await publicServices.getUserDataById(userid);
        // Throw error
        if (userData.result.length == 0) throw "User does not exist";
        // Sending response to client
        res.status(200).send({
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
        errorHandler(e, res);
    }
};
const search = async(req, res) => {
    const search = req.params.search;
    try {
        const data = await publicServices.search(search);
        if (data.result.length == 0) throw "Empty";
        // Sending response to client
        res.status(200).send({
            status: 200,
            error: null,
            message: "All docs",
            docs: data.result,
        });
    } catch (e) {
        errorHandler(e, res);
    }
};
const getComments = async(req, res) => {
    //   Extracting id from query
    const id = req.query.id;
    // Converting id into number
    if (Number(id)) {
        // Creating limit of result
        const limit = 50;
        // Creating offset
        const offset = (Number(page) - 1) * limit;
        // Getting docs data from db
        const comments = await publicServices.getDocs(category, limit, offset);
    }
};

// Exporting functions
module.exports = {
    getDocs,
    getDocById,
    getUserProfileById,
    search,
    getComments,
};