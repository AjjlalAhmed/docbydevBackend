// Importing thing we need
const runQuery = require("../helpers/runQuery");
// Functions
const insertNewUser = async(username, useremail, userpassword) => {
    const data = [username, useremail, userpassword, Date()];
    const query = `INSERT INTO users (username,useremail,userpassword,joined) VALUES (?,?,?,?)`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
const checkUserExis = async(useremail) => {
    const data = [useremail];
    const query = `SELECT * FROM users WHERE useremail = ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// Exporting functions
module.exports = {
    insertNewUser,
    checkUserExis,
};