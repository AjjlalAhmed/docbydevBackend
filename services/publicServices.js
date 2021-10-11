// Importing thing we need
const runQuery = require("../helpers/runQuery");
// Functions
const getDocs = async(category) => {
    let query = `SELECT
    user_docs.*,
    users.username,
    users.profileimage,
    COUNT(likes.postid) as totallikes
    FROM user_docs
    INNER JOIN users ON user_docs.userid = users.id
    LEFT JOIN likes ON  user_docs.id = likes.postid
    GROUP BY user_docs.id
    ORDER BY `;
    if (category == "latest") query = query.concat("user_docs.date ASC");
    else if (category == "top") query = query.concat("totallikes DESC");
    else if (category == "feed") query = query.concat("RAND()");
    const result = await runQuery.runQuery(query, []);
    return result;
};
const getDocById = async(id) => {
    const data = [Number(id)];
    const query = `SELECT user_docs.*,
     users.username, 
     users.profileimage, 
     COUNT(likes.postid) 
     as totallikes 
     FROM user_docs 
     INNER JOIN users 
     ON user_docs.userid = users.id 
     LEFT JOIN likes ON user_docs.id = likes.postid 
     WHERE user_docs.id = ?
     #GROUP BY user_docs.id`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
const getUserDocsById = async(userid) => {
    const data = [Number(userid)];
    const query = `SELECT
    user_docs.*,
    users.profileimage,
    COUNT(likes.postid) as totallikes
    FROM user_docs
    LEFT JOIN likes ON  user_docs.id = likes.postid
    INNER JOIN users ON  user_docs.userid = users.id
    WHERE user_docs.userid = ?
    GROUP BY user_docs.id`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
const getUserDataById = async(userid) => {
    const data = [Number(userid)];
    const query = `SELECT username,
    useremail,id,joined,profession,phone,address,site,
    birthday,gender,bio,skills,profileimage 
    FROM users 
    WHERE id = ? `;
    const result = await runQuery.runQuery(query, data);
    return result;
};
const search = async(search) => {
    const data = [`%${search}%`];
    const query = `SELECT
    user_docs.*,
    users.username,
    users.profileimage,
    COUNT(likes.postid) as totallikes
    FROM user_docs
    INNER JOIN users ON user_docs.userid = users.id
    LEFT JOIN likes ON  user_docs.id = likes.postid
    GROUP BY user_docs.id
    HAVING user_docs.doctitle LIKE ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// Exporting functions
module.exports = {
    getDocs,
    getDocById,
    getUserDocsById,
    getUserDataById,
    search,
};