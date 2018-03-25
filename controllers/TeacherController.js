'use strict';

const TeacherService = require('../services/TeacherService');

class TeacherController {
    constructor(router) {
        this.router = router;
        this.teacherService = new TeacherService();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/register', this.registerStudents.bind(this));
        this.router.post('/commonstudents', this.getCommonStudents.bind(this));
        this.router.post('/suspend', this.suspendStudent.bind(this));
        this.router.post('/retrievefornotifications', this.getStudentsForNotification.bind(this));
    }

    registerStudents(req, res){
        const teacher_email = req.body.teacher;
        const student_emails = req.body.students;

        if (!teacher_email) res.status(422).send({ error: "teacher required" });
        if (!student_emails) res.status(422).send({ error: "students required" });
        if (student_emails.length === 0) res.status(400).send({ error: "at least one student required" });

        this.teacherService.registerStudents(teacher_email, student_emails, res);
    }

    getCommonStudents(req, res){
        const teacher_emails = req.body.teacher;

        if (!teacher_emails) res.status(422).send({ error: "teacher required" });
        if (teacher_emails.length === 0) res.status(400).send({ error: "at least one teacher should be present" });

        this.teacherService.getCommonStudents(teacher_emails, res);
    }

    suspendStudent(req, res){
        const student_email = req.body.student;

        if (!student_email) res.status(422).send({ error: "student required" });

        this.teacherService.suspendStudent(student_email, res);
    }

    getStudentsForNotification(req, res){
        const teacher_email = req.body.teacher;
        const notification = req.body.notification;

        if (!teacher_email) res.status(422).send({ error: "teacher required" });
        if (!notification) res.status(422).send({ error: "notification required" });

        let student_emails = [];
        notification.split(' ').forEach(word => {
            if (word[0] === '@') {
                let student_email = word.substr(1);
                student_emails.push(student_email);
            }
        });

        this.teacherService.getStudentsForNotification(teacher_email, student_emails, res);
    }
}

module.exports = TeacherController;
