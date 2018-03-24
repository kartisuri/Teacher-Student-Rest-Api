'use strict';

const mysql = require('mysql');

module.exports = {
    name: 'teacher admin rest-api',
    port: process.env.PORT || 3030,
    db_url: 'mysql://b625e58d5c2e6f:dc84dd5d@us-cdbr-iron-east-05.cleardb.net/heroku_b362f1683525cd9?reconnect=true',
    db: {
        get : mysql.createConnection({
            host     : 'us-cdbr-iron-east-05.cleardb.net',
            user     : 'b625e58d5c2e6f',
            password : 'dc84dd5d',
            database : 'heroku_b362f1683525cd9'
        })
    }
};
