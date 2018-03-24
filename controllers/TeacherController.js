'use strict';

const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const TeacherService = require('../services/TeacherService');

class TeacherController {
    constructor(router) {
        this.router = router;
        this.teacherService = new TeacherService();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post('/register', this.registerStudents.bind(this));
        this.router.get('/commonstudents/:teacher', this.getCommonStudents.bind(this));
        this.router.post('/suspend', this.suspendStudent.bind(this));
        this.router.post('/retrievefornotifications', this.getStudentsForNotification.bind(this));
    }

    registerStudents(req, res){
        const teacher_email = req.body.teacher;
        const student_emails = req.body.students;
        if (!teacher_email) res.status(422).send({ error: "teacher required" });
        if (!student_emails) res.status(422).send({ error: "students required" });
        if (student_emails.length === 0) res.status(422).send({ error: "at least one student required" });

        const teacher = new Teacher(teacher_email);
        let students = [];
        student_emails.forEach(email => {
           students.push(new Student().email = email);
        });

        const success = this.teacherService.registerStudents(teacher, students);
        if (!success) res.status(500).send({ error: "error in registering students"});
        res.status(204).send();
    }

    getCommonStudents(req, res){
        const teacher_emails = req.param.teacher;
        if (!teacher_emails) res.status(422).send({ error: "teacher required" });
        if (teacher_emails.length === 0) res.status(404).send({ error: "at least one teacher should be present" });

        let teachers = [];
        teacher_emails.forEach(email => {
            teachers.push(new Teacher().email = email)
        });

        const common_students = this.teacherService.getCommonStudents(teachers);
        if (!common_students) res.status(500).send({ error: "error in retrieving common students"});
        res.status(200).send({ students: common_students });
    }

    suspendStudent(req, res){
        const student_email = req.body.student;
        if (!student_email) res.status(422).send({ error: "student required" });

        const student = new Student(student_email, 'Suspend');
        if (!this.teacherService.checkStudent(student)) res.status(404).send({ error: student.email + " not found" });

        let success = this.teacherService.suspendStudent(student);
        if (!success) res.status(500).send({ error: "error in suspending students"});
        res.status(204).send();
    }

    getStudentsForNotification(req, res){
        const teacher_email = req.body.teacher;
        const notification = req.body.notification;
        if (!teacher_email) res.status(422).send({ error: "teacher required" });
        if (!notification) res.status(422).send({ error: "notification required" });

        const teacher = new Teacher(teacher_email);
        let students = [];
        notification.split(' ').forEach(word => {
            if (word[0] === '@') {
                let student_email = word.substr(1);
                students.push(new Student(student_email));
                if (!this.teacherService.checkStudent(student))
                    res.status(404).send({ error: student.email + " not found" });
            }
        });

        const recipients = this.teacherService.getStudentsForNotification(teacher, students);
        if (!recipients) res.status(500).send({ error: "error in retrieving students for notification"});
        res.status(200).send({ recipients: [...recipients] });
    }
}

module.exports = TeacherController;
