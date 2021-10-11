// Importing thing we need
const runQuery = require("../helpers/runQuery");
// Functions

// This function check if user exist
const checkUserExist = async(useremail) => {
    const data = [useremail];
    const query = `SELECT * FROM users WHERE useremail = ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function insert doc database
const insertDoc = async(id, useremail, docInfo) => {
    const data = [
        Number(id),
        docInfo.docTitle,
        docInfo.tags,
        docInfo.markdown.replace(/'/g, "`"),
        Date(),
    ];
    const query = `INSERT INTO user_docs (userid,doctitle,doctags,docdata,date) VALUES (?,?,?,?,?) `;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function add like to doc
const addLike = async(userid, docid) => {
    const data = [Number(userid), Number(docid)];
    const query = `INSERT INTO likes (userid,postid) VALUES (?,?)`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function check if user liked doc
const checkIfUserLiked = async(userid, docids) => {
    const data = [Number(userid), docids.split(",").map(Number)];
    const query = `SELECT * FROM likes WHERE likes.userid = ? AND likes.postid  IN (?)`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function this delete like from liked doc
const deletLike = async(userid, docid) => {
    const data = [Number(userid), Number(docid)];
    const query = `DELETE FROM likes WHERE userid = ? AND postid = ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function get user own docs data
const getUserData = async(userid) => {
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
// This function edit profile
const editProfile = async(userid, user, imgUrl) => {
    const data = [
        user.name,
        user.birthday,
        user.profession,
        user.bio,
        user.skills,
        user.phone,
        user.address,
        user.site,
        user.gender,
    ];
    let query = `UPDATE users SET username = ?, birthday = ?, profession = ?, bio = ? , skills = ? ,phone = ? , address = ? , site = ?, gender = ?`;
    if (imgUrl) {
        data.push(imgUrl);
        data.push(Number(userid));
        query = query.concat(`, profileimage = ? WHERE id = ?`);
    } else {
        query = query.concat(` WHERE id = ?`);
        data.push(Number(userid));
    }
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function delete user own doc
const deleteDoc = async(userid, docid) => {
    const data = [Number(docid), Number(userid)];
    const query = `DELETE FROM user_docs WHERE id = ? AND userid = ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function get doc by id
const getDoc = async(docid) => {
    const data = [Number(docid)];
    const query = `SELECT * FROM user_docs WHERE id = ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// This function edit doc
const editDoc = async(docid, docInfo) => {
    const docData = docInfo.markdown.replace(/'/g, "`");
    const data = [
        docInfo.docTitle,
        docInfo.tags,
        docData,
        Number(docid),
    ];
    const query = `UPDATE user_docs SET doctitle = ? , doctags = ? , docdata = ?
  WHERE id = ?`;
    const result = await runQuery.runQuery(query, data);
    return result;
};
// Exporting functions
module.exports = {
    checkUserExist,
    insertDoc,
    addLike,
    checkIfUserLiked,
    deletLike,
    getUserData,
    editProfile,
    deleteDoc,
    getDoc,
    editDoc,
};