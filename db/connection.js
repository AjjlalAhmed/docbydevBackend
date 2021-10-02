const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER || "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
});
db.connect(function(err) {
    if (err) throw err.message;
    console.log("Connected!");
});
module.exports = db;