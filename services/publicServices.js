// Importing thing we need
const runQuery = require("../reusable/runQuery");
// Functions
const getDocsService = async() => {
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
const getDocByIdService = async(id) => {
    const query = `SELECT user_docs.*,
     users.username, 
     users.profileimage, 
     COUNT(likes.postid) 
     as totallikes 
     FROM user_docs 
     INNER JOIN users 
     ON user_docs.userid = users.id 
     LEFT JOIN likes ON user_docs.id = likes.postid 
     WHERE user_docs.id = ${Number(id)} 
     #GROUP BY user_docs.id`;
    const result = await runQuery.runQuery(query);
    return result;
};
const getUserDocsByIdService = async(userid) => {
    const query = `SELECT
    user_docs.*,
    users.profileimage,
    COUNT(likes.postid) as totallikes
    FROM user_docs
    LEFT JOIN likes ON  user_docs.id = likes.postid
    INNER JOIN users ON  user_docs.userid = users.id
    WHERE user_docs.userid = ${Number(userid)}
    GROUP BY user_docs.id`;
    const result = await runQuery.runQuery(query);
    return result;
};
const getUserDataByIdService = async(userid) => {
    const query = `SELECT username,
    useremail,
    id,
    joined,
    profession,
    phone,
    address,
    site,
    birthday,
    gender,
    bio,
    skills,
    profileimage FROM users 
    WHERE id = ${Number(userid)} `;
    const result = await runQuery.runQuery(query);
    return result;
};
// Exporting functions
module.exports = {
    getDocsService,
    getDocByIdService,
    getUserDocsByIdService,
    getUserDataByIdService
};