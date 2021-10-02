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
    let query = `CREATE TABLE IF NOT EXISTS users(   
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

    db.query(query, function(err, results, fields) {
        if (err) {
            console.log(err);
        }
    });

});
module.exports = db;