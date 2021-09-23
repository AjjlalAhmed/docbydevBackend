// Importing thing we need
const runQuery = require("../reusable/runQuery");
// Functions
const checkUserExistService = async(useremail) => {
    const query = `SELECT * FROM users WHERE useremail = '${useremail}'`;
    const result = await runQuery.runQuery(query);
    return result;
};
const insertDocService = async(id, useremail, docInfo) => {
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
const addLikeService = async (userid, docid) => {
  const query = `INSERT INTO likes (userid,postid) VALUES (${userid},${docid})`;
  const result = await runQuery.runQuery(query);
  return result;
};
const checkIfUserLikedService = async (userid, docids) => {
  const query = `SELECT * FROM likes WHERE likes.userid = ${userid} AND likes.postid  IN (${docids})`;
  const result = await runQuery.runQuery(query);
  return result;
};
const deletLikeService = async (userid, docid) => {
  const query = `DELETE FROM likes WHERE userid = ${userid} AND postid = ${docid}`;
  const result = await runQuery.runQuery(query);
  return result;
};
const getUserDataService = async (userid) => {
  const query = `SELECT
  user_docs.*,
  COUNT(likes.postid) as totallikes
  FROM user_docs
  LEFT JOIN likes ON  user_docs.id = likes.postid
  WHERE user_docs.userid = ${Number(userid)}
  GROUP BY user_docs.id`;
  const result = await runQuery.runQuery(query);
  return result;
};
// Exporting functions
module.exports = {
  checkUserExistService,
  insertDocService,
  addLikeService,
  checkIfUserLikedService,
  deletLikeService,
  getUserDataService,
};