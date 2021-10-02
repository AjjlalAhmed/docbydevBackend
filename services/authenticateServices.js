// Importing thing we need
const runQuery = require("../helpers/runQuery");
// Functions
const insertNewUser = async(username, useremail, userpassword) => {
    const query = `INSERT INTO users (username,useremail,userpassword,joined) VALUES ('${username}','${useremail}','${userpassword}','${Date()}')`;
    const result = await runQuery.runQuery(query);
    return result;
};
const checkUserExis = async(useremail) => {
    const query = `SELECT * FROM users WHERE useremail = '${useremail}'`;
    const result = await runQuery.runQuery(query);
    return result;
};
// Exporting functions
module.exports = {
    insertNewUser,
    checkUserExis,
};