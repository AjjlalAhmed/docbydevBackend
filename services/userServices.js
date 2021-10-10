// Importing thing we need
const runQuery = require("../helpers/runQuery");
// Functions

// This function check if user exist
const checkUserExist = async(useremail) => {
    const query = `SELECT * FROM users WHERE useremail = '${useremail}'`;
    const result = await runQuery.runQuery(query);
    return result;
};
// This function insert doc database
const insertDoc = async(id, useremail, docInfo) => {
        try {
            const query = `INSERT INTO user_docs (userid,doctitle,doctags,docdata,date) VALUES (${id},'${
      docInfo.docTitle
    }','${docInfo.tags}','${docInfo.markdown.replace(
      /'/g,
      "`"
    )}','${Date()}') `;
    const result = await runQuery.runQuery(query);
    return result;
  } catch (e) {
    console.log(e);
    return "error";
  }
};
// This function add like to doc
const addLike = async (userid, docid) => {
  const query = `INSERT INTO likes (userid,postid) VALUES (${userid},${docid})`;
  const result = await runQuery.runQuery(query);
  return result;
};
// This function check if user liked doc
const checkIfUserLiked = async (userid, docids) => {
  const query = `SELECT * FROM likes WHERE likes.userid = ${userid} AND likes.postid  IN (${docids})`;
  const result = await runQuery.runQuery(query);
  return result;
};
// This function this delete like from liked doc
const deletLike = async (userid, docid) => {
  const query = `DELETE FROM likes WHERE userid = ${userid} AND postid = ${docid}`;
  const result = await runQuery.runQuery(query);
  return result;
};
// This function get user own docs data
const getUserData = async (userid) => {
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
// This function edit profile
const editProfile = async (userid, user, imgUrl) => {
  let query = null
  if (imgUrl) {
    query = `UPDATE users SET 
    username = '${user.name}', 
    birthday = '${user.birthday}', 
    profession = '${user.profession}', 
    bio = '${user.bio}',
    skills = '${user.skills}',
    phone = '${user.phone}',
    address = '${user.address}',
    site = '${user.site}',
    gender = '${user.gender}',
    profileimage = '${imgUrl}' WHERE id = ${Number(userid)} `;
  } else {
    query = `UPDATE users SET 
    username = '${user.name}', 
    birthday = '${user.birthday}', 
    profession = '${user.profession}', 
    bio = '${user.bio}',
    skills = '${user.skills}',
    phone = '${user.phone}',
    address = '${user.address}',
    site = '${user.site}',
    gender = '${user.gender}' 
    WHERE id = ${Number(userid)} `;
  }
  const result = await runQuery.runQuery(query);
  return result;
};
// This function delete user own doc
const deleteDoc = async (userid, docid) => {
  const query = `DELETE FROM user_docs WHERE id = ${Number(
    docid
  )} AND userid = ${userid}`;
  const result = await runQuery.runQuery(query);
  return result;
};
// This function get doc by id
const getDoc = async (docid) => {
  const query = `SELECT * FROM user_docs WHERE id = ${Number(docid)}`;
  const result = await runQuery.runQuery(query);
  return result;
};
// This function edit doc
const editDoc = async (docid, docInfo) => {
  const query = `UPDATE user_docs SET doctitle = '${
    docInfo.docTitle
  }',doctags = '${docInfo.tags}',docdata = '${docInfo.markdown.replace(
    /'/g,
    "`"
  )}'
  WHERE id =${Number(docid)};`;
  const result = await runQuery.runQuery(query);
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