'use strict';

const mysql = require('mysql');

class StudentDao {
    constructor(connection) {
        this.connection = connection;
    }

    create(student){
        let query = "insert into ?? (??, ??) values(?, ?);";
        const params = ["teacherstudent.student", "student_email", "student_status", student.email, student.status];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            if(err) return false;
            return row;
        });
    }

    findOne(student){
        let query = "select ??, ?? from ?? where ?? = ?;";
        const params = ["s.student_email", "s.student_status", "teacherstudent.student s",
                        "s.student_email", student.email];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            if(err) return false;
            return row;
        });
    }

    update(student){
        let query = "update ?? set ?? = ? where ?? = ?;";
        const params = ["teacherstudent.student", "student_status", student.status, "student_email", student.email];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            if(err) return false;
            return row;
        });
    }
}

module.exports = StudentDao;
