'use strict';

const mysql = require('mysql');

module.exports = {
    name: 'teacher admin rest-api',
    db: {
        get : mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            database : 'teacherstudent'
        })
    }
};
