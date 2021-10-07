const mysql = require("mysql");
const pool = mysql.createPool({
    host: "zf4b0c949-mysql.qovery.io",
    user: process.env.USER || "root",
    password: "6eEDMxs8iJiFUXk2",
    database: "mysql-zf4b0c949",
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci",
});
module.exports = pool;