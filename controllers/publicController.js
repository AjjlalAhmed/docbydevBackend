// Importing thing we need
const publicServices = require("../services/publicServices");
// Functions
const getDocsController = async(req, res) => {
    const data = await publicServices.getDocsServices();
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
    const data = await publicServices.getDocByIdServices(id);
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
// Exporting functions
module.exports = {
    getDocsController,
    getDocByIdController,
};