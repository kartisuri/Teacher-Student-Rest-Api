'use strict';

const mysql = require('mysql');

class TeacherDao {
    constructor(connection) {
        this.connection = connection;
    }

    findOne(teacher){
        let query = "select ?? from ?? where ?? = ?;";
        const params = ["t.teacher_email", "teacherstudent.teacher t", "t.teacher_email", teacher.email];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            if(err) return false;
            return row;
        });
    }

    create(teacher){
        let query = "insert into ?? (??) values(?)";
        const params = ["teacherstudent.teacher", "teacher_email", teacher.email];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            if(err) console.log(err);
            return row;
        });
    }

    createStudentForTeacher(teacher, student){
        let query = "insert into ?? (??, ??) values(?, ?);";
        const params = ["teacherstudent.teacherstudent", "teacher_email", "student_email", teacher.email, student.email];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, row){
            if(err) return false;
            return row;
        });
    }

    findStudentsForTeacher(teacher){
        let query = "select ?? from ?? where ?? = ?;";
        const params = ["ts.student_email", "teacherstudent.teacherstudent ts", "ts.student_email", teacher.email];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, rows){
            if(err) return false;
            return rows;
        });
    }

    findActiveStudentsForTeacher(teacher){
        let query = "select ?? from ?? left join ?? on ?? = ?? where ?? = ? and ?? = ?;";
        const params = ["ts.student_email", "teacherstudent.teacherstudent ts", "teacherstudent.student s",
                        "s.student_email", "ts.student_email", "ts.teacher_email",
                        teacher.email, "s.student_status", "active"];
        query = mysql.format(query, params);

        this.connection.query(query, function(err, rows){
            if(err) return false;
            return rows;
        });
    }
}

module.exports = TeacherDao;
