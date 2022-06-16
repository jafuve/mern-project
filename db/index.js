const mysql = require('mysql');

async function initializeDB() {

    const con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connected Successfully!");
    });

}

module.exports = { initializeDB };