'use strict';

const mysql = require('mysql');
const config = require('./config/config');

class DbInit {
    constructor() {
        this.connection = config.db.get;
        this.createStudentTable();
        this.addStudentIndex();
        this.createTeacherTable();
        this.addTeacherIndex();
        this.createTeacherStudentTable();
        this.addTeacherStudentIndex();
    }

    createStudentTable() {
        let query = "CREATE TABLE ?? (?? varchar(45) NOT NULL, ?? varchar(10) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
        const params = ["student", "student_email", "student_status"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            console.log(row);
            return !err;
        });
    }

    addStudentIndex() {
        let query = "ALTER TABLE ?? ADD PRIMARY KEY (??) AND UNIQUE_KEY ?? (??);";
        const params = ["student", "student_email", "student_email_UNIQUE", "student_email"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            console.log(row);
            return !err;
        });
    }

    createTeacherTable() {
        let query = "CREATE TABLE ?? (?? varchar(45) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
        const params = ["teacher", "teacher_email"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            console.log(row);
            return !err;
        });
    }

    addTeacherIndex() {
        let query = "ALTER TABLE ?? ADD PRIMARY KEY (??) AND UNIQUE_KEY ?? (??);";
        const params = ["teacher", "teacher_email", "teacher_email_UNIQUE", "teacher_email"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            console.log(row);
            return !err;
        });
    }

    createTeacherStudentTable() {
        let query = "CREATE TABLE ?? (?? varchar(45) NOT NULL, ?? varchar(10) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
        const params = ["teacherstudent", "teacher_email", "student_email"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            console.log(row);
            return !err;
        });
    }

    addTeacherStudentIndex() {
        let query = "ALTER TABLE ?? ADD PRIMARY KEY (??, ??);";
        const params = ["teacherstudent", "teacher_email", "student_email"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            console.log(row);
            return !err;
        });
    }
}

module.exports = new DbInit();
