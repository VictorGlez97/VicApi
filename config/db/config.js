const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'us-east.connect.psdb.cloud',
    user: '29fjzwfu3626rl395w3t',
    password: 'pscale_pw_nWIy1RzNeJ5ng7c5npdu6h4XYBRHu4BLuIxMnacsRKN',
    database: 'victors',
    ssl: true
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log('Database Connected!!!');
});

module.exports = dbConn;
