// Impoting thine we need  
const mysql = require("mysql");
// Creating pool 
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: "utf8mb4",
    collation: "utf8mb4_unicode_ci",
});
// Exporting pool 
module.exports = pool;