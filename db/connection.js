const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER || "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE || "docbydev",
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci",
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // connect to the MySQL server
    let createUserTableQuery = `CREATE TABLE IF NOT EXISTS users(   
        id INT auto_increment, 
        username VARCHAR(255),
        useremail VARCHAR(1000),
        userpassword VARCHAR(1000),
        joined VARCHAR(1000),
        profession VARCHAR(1000),
        bio VARCHAR(1000),
        skills VARCHAR(1000),
        profileimage VARCHAR(1000),
        phone TEXT,
        address TEXT,
        site TEXT,
        birthday TEXT,
        gender TEXT,
        PRIMARY KEY(id)
        )`;
    db.query(createUserTableQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
    let createUserDocsTableQuery = `CREATE TABLE IF NOT EXISTS user_docs(
        id INT auto_increment, 
        userid INT,
        doctitle VARCHAR(1000),
        doctags VARCHAR(1000),
        docdata LONGTEXT,
        data VARCHAR(1000),
        likes INT,
        PRIMARY KEY(id)
    )`;
    db.query(createUserDocsTableQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
    let createDocsLikedsTableQuery = `CREATE TABLE IF NOT EXISTS likes(
        id INT auto_increment, 
        userid INT,
        postid INT,
        PRIMARY KEY(id)
    )`;
    db.query(createDocsLikedsTableQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
});
module.exports = db;