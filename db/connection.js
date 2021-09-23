const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "docbydev",
});
db.connect(function(err) {
    if (err) throw err.message;
    console.log("Connected!");
});
module.exports = db;