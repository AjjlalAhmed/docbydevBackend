const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "docbydev",
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
});
db.connect(function(err) {
    if (err) throw err.message;
    console.log("Connected!");
});
module.exports = db;