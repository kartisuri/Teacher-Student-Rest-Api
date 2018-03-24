'use strict';

class Student {
    constructor (email, status='active') {
        this.email = email;
        this.status = status;
    }
}

module.exports = Student;
