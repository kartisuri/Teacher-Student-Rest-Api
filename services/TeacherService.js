'use strict';

const async = require("async");
const db = require('../models');

class TeacherService {
    constructor() {
    }

    registerStudents(teacher_email, student_emails, res) {
        db.Teacher.findOrCreate({where: {email: teacher_email}})
            .spread((teacher, created) => {
                console.log(teacher.get({plain: true}));
                console.log("Teacher created: ", created);
                student_emails.forEach(student_email => {
                    db.Student.findOrCreate({where: {email: student_email, status: 1, teacherId: teacher.id}})
                        .spread((student) => {
                            console.log(student.get({plain: true}));
                            console.log("Student created: ", created);
                            student.setTeacher(teacher);
                        });
                });
            });
        res.status(204).send();
    }

    getCommonStudents(teacher_emails, res) {
        let student_emails_for_each_teacher = [];
        async.each(teacher_emails,
            function (teacher_email, callback) {
                db.Teacher.findOne({where: {email: teacher_email}}).then((teacher) => {
                    if (!teacher) {
                        res.status(400).send({error: teacher.email + " not present"});
                    }
                    else {
                        db.Student.findAll({where: {teacherId: teacher.id}})
                            .then((students) => {
                                let student_emails_for_teacher = [];
                                students.forEach(student => {
                                    student_emails_for_teacher.push(student.email);
                                });
                                student_emails_for_each_teacher.push(new Set(student_emails_for_teacher));
                                callback();
                            });
                    }
                });
            },
            function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send({error: "error in retrieving students for notification"});
                }
                const recipients = student_emails_for_each_teacher
                    .reduce((set1, set2) => [...set1].filter(email => set2.has(email)));
                res.status(200).send({recipients: [...recipients]});
            });
    }

    suspendStudent(student_email, res) {
        db.Student.findAll({where: {email: student_email}}).then((students) => {
            if (students.length === 0) {
                res.status(400).send({error: student_email + " not found"});
            }
            else {
                db.Student.update({status: 0}, {where: {email: student_email}})
                    .then(() => {
                        res.status(204).send();
                    });
            }
        });
    }

    getStudentsForNotification(teacher_email, student_emails, res) {
        let recipient_emails = [];
        db.Teacher.findOne({where: {email: teacher_email}}).then((teacher) => {
            if (!teacher) {
                res.status(400).send({error: teacher_email + " not present"});
            }
            else {
                db.Student.findAll({where: {teacherId: teacher.id, status: 1}})
                    .then((students) => {
                        students.forEach(student => {
                            recipient_emails.push(student.email)
                        });
                        const recipients = new Set(recipient_emails.concat(student_emails));
                        res.status(200).send({recipients: [...recipients]});
                    });
            }
        });
    }
}

module.exports = TeacherService;
