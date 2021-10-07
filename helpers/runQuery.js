// Importing thing we need
const pool = require("../db/connection");
// Function
const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query(query, (err, result) => {
                    if (err) throw err;
                    connection.release();
                    return resolve({ result: result, reject: false });
                });
            });
        } catch (e) {
            return reject({ Error: err, reject: true });
        }
    });
};
// Exporting functions
module.exports = {
    runQuery,
};