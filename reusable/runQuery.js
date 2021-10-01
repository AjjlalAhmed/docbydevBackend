// Importing thing we need
const db = require("../db/connection");
// Function
const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                console.log(err.sqlMessage);
                return reject({ Error: err, reject: true });
            } else {
                return resolve({ result: result, reject: false });
            }
        });
    });
};
// Exporting functions
module.exports = {
    runQuery,
};