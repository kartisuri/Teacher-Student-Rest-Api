'use strict';

const TeacherDao = require('../daos/TeacherDao');
const StudentDao = require('../daos/StudentDao');
const config = require('../config/config');

class TeacherService {
    constructor(){
        this.teacherDao = new TeacherDao(config.db.get);
        this.studentDao = new StudentDao(config.db.get);
    }

    registerStudents(teacher, students) {
        let student_rows = [];
        let teacher_row = this.teacherDao.findOne(teacher);
        if (!teacher_row) teacher_row = this.teacherDao.create(teacher);
        console.log(teacher_row);
        if (!teacher_row) return false;

        students.forEach(student => {
            const student_row = this.studentDao.create(student);
            if (!student_row) return false;
            student_rows.push(student_row);
        });

        student_rows.forEach(row => {
           const teacher_student_row = this.teacherDao.createStudentForTeacher(teacher_row, row);
           if (!teacher_student_row) return false;
        });
        return true;
    }

    getCommonStudents(teachers) {
        let student_emails_for_each_teacher = [];
        teachers.forEach(teacher => {
            let student_emails_for_teacher;
            student_emails_for_teacher = this.teacherDao.findStudentsForTeacher(teacher);
            if (!student_emails_for_teacher) return false;
            student_emails_for_each_teacher.push(new Set(student_emails_for_teacher));
        });
        return student_emails_for_each_teacher.reduce((set1, set2) => [...set1].filter(email => set2.has(email)));
    }

    checkStudent(student){
        return this.studentDao.findOne(student);
    }

    suspendStudent(student) {
        return this.studentDao.update(student);
    }

    getStudentsForNotification(teacher, students) {
        let recipient_emails = [];
        students.forEach(student => {
           recipient_emails.push(student.email);
        });

        student_emails_for_teacher = this.teacherDao.findActiveStudentsForTeacher(teacher);
        if(!student_emails_for_teacher) return false;
        recipient_emails.concat(student_emails_for_teacher);
        return new Set(recipient_emails);
    }
}

module.exports = TeacherService;