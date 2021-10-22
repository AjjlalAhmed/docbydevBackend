// Importing thing we need
const pool = require("../db/connection");
// Function
const runQuery = (query, value) => {
    return new Promise((resolve, reject) => {
        try {
            pool.getConnection((err, connection) => {
                if (err) return;
                connection.query(query, value, (err, result) => {
                    if (err) return;
                    connection.release();
                    return resolve({ result: result, reject: false });
                });
            });
        } catch (e) {
            console.log(e);
            error = e;
            return reject({ Error: e, reject: true });
        }
    });
};
// Exporting functions
module.exports = {
    runQuery,
};