// Importing thing we need
const runQuery = require("../reusable/runQuery");
// Function
const insertNewUserServices = async(username, useremail, userpassword) => {
    const query = `INSERT INTO users (username,useremail,userpassword,joined) VALUES ('${username}','${useremail}','${userpassword}','${Date()}')`;
    const result = await runQuery.runQuery(query);
    return result;
};
// Functions
const checkUserExistService = async(useremail) => {
    const query = `SELECT * FROM users WHERE useremail = '${useremail}'`;
    const result = await runQuery.runQuery(query);
    return result;
};
// Exporting functions
module.exports = {
    insertNewUserServices,
    checkUserExistService,
};