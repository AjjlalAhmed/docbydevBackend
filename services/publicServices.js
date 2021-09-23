// Importing thing we need
const runQuery = require("../reusable/runQuery");
// Functions 
const getDocsServices = async() => {
    const query = `SELECT
    user_docs.*,
    users.username,
    users.profileimage,
    COUNT(likes.postid) as totallikes
    FROM user_docs
    INNER JOIN users ON user_docs.userid = users.id
    LEFT JOIN likes ON  user_docs.id = likes.postid
    GROUP BY user_docs.id
    `;
    const result = await runQuery.runQuery(query);
    return result;
};
const getDocByIdServices = async(id) => {
    const query = `SELECT user_docs.*, users.username, users.profileimage, COUNT(likes.postid) as totallikes FROM user_docs INNER JOIN users ON user_docs.userid = users.id LEFT JOIN likes ON user_docs.id = likes.postid WHERE user_docs.id = ${Number(
    id
  )} #GROUP BY user_docs.id`;
    const result = await runQuery.runQuery(query);
    return result;
};
// Exporting functions
module.exports = {
    getDocsServices,
    getDocByIdServices,
};