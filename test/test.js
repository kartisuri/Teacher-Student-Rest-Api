const express = require('express');
const supertest = require('supertest');
const app = express();

process.env.NODE_ENV = 'test';

// create students for teacher t1
describe('POST /api/register for teacher 1', function () {
    it('should send back status code 204', function () {
        supertest(app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t1@ex.com",
                students:
                    [
                        "s1@ex.com",
                        "s2@ex.com"
                    ]
            })
            .expect(204);
    });
});

// create students for teacher t2
describe('POST /api/register for teacher 2', function () {
    it('should send back status code 204', function () {
        supertest(app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t2@ex.com",
                students:
                    [
                        "s2@ex.com",
                        "s3@ex.com"
                    ]
            })
            .expect(204);
    });
});

// register with empty students
describe('POST /api/register empty students', function () {
    it('should send back status code 400', function () {
        supertest(app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t2@ex.com",
                students: []
            })
            .expect(400);
    });
});

// malformed request body for teacher
describe('POST /api/register malformed request body for teacher', function () {
    it('should send back status code 422', function () {
        supertest(app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                teacher1: "t2@ex.com",
                students: [ "s1@ex.com" ]
            })
            .expect(422);
    });
});

// malformed request body for student
describe('POST /api/register malformed request body for students', function () {
    it('should send back status code 422', function () {
        supertest(app)
            .post('/api/register')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t2@ex.com",
                students1: [ "s1@ex.com" ]
            })
            .expect(422);
    });
});

// common students for single teacher t1
describe('POST /api/commonstudents for one teacher', function () {
    it('should send back a JSON object containing common students as response', function () {
        supertest(app)
            .post('/api/commonstudents')
            .set('Content-Type', 'application/json')
            .send({
                teacher: [
                    "t1@gmail.com"
                ]
            })
            .expect(200)
            .expect({students: ["s1@ex.com", "s2@ex.com"]});
    });
});

// common students for two teachers t1 t2
describe('POST /api/commonstudents for two teachers', function () {
    it('should send back a JSON object containing common students as response', function () {
        supertest(app)
            .post('/api/commonstudents')
            .set('Content-Type', 'application/json')
            .send({
                teacher: [
                    "t1@gmail.com",
                    "t2@gmail.com"
                ]
            })
            .expect(200)
            .expect({students: ["s2@ex.com"]});
    });
});

// common students with empty teacher
describe('POST /api/commonstudents with empty teacher', function () {
    it('should send back status as 400', function () {
        supertest(app)
            .post('/api/commonstudents')
            .set('Content-Type', 'application/json')
            .send({
                teacher: []
            })
            .expect(400);
    });
});

// common students with teacher who is not present
describe('POST /api/commonstudents teacher not present', function () {
    it('should send back status as 400', function () {
        supertest(app)
            .post('/api/commonstudents')
            .set('Content-Type', 'application/json')
            .send({
                teacher: ["t5@gmail.com"]
            })
            .expect(400);
    });
});

// common students with malformed request
describe('POST /api/commonstudents', function () {
    it('should send back status as 422', function () {
        supertest(app)
            .post('/api/commonstudents')
            .set('Content-Type', 'application/json')
            .send({
                teacher1: [ "t1@gmail.com" ]
            })
            .expect(422);
    });
});

// suspend student positive workflow
describe('POST /api/suspend suspend student', function () {
    it('should send back a status code 204', function () {
        supertest(app)
            .post('/api/suspend')
            .set('Content-Type', 'application/json')
            .send({
                student: "s1@ex.com"
            })
            .expect('Content-Type', /json/)
            .expect(204);
    });
});

// suspend student when student not present
describe('POST /api/suspend suspend student when student not present', function () {
    it('should send back a status code 400', function () {
        supertest(app)
            .post('/api/suspend')
            .set('Content-Type', 'application/json')
            .send({
                student: "s6@ex.com"
            })
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

// suspend same student again
describe('POST /api/suspend suspend same student again', function () {
    it('should send back a status code 204', function () {
        supertest(app)
            .post('/api/suspend')
            .set('Content-Type', 'application/json')
            .send({
                student: "s1@ex.com"
            })
            .expect('Content-Type', /json/)
            .expect(204);
    });
});

// suspend student malformed request
describe('POST /api/suspend suspend student', function () {
    it('should send back a status code 422', function () {
        supertest(app)
            .post('/api/suspend')
            .set('Content-Type', 'application/json')
            .send({
                student1: "s1@ex.com"
            })
            .expect('Content-Type', /json/)
            .expect(422);
    });
});

// retrieve students positive workflow with all students under teacher
describe('POST /api/retrievefornotifications positive workflow with all students under teacher', function () {
    it('should send back a JSON object as response', function () {
        supertest(app)
            .post('/api/retrievefornotifications')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t2@gmail.com",
                notification: "Hello students! @s2@example.com @s3@example.com"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({recipients: ["s2@ex.com", "s3@ex.com"]});
    });
});

// retrieve students positive workflow with some students not under teacher
describe('POST /api/retrievefornotifications positive workflow with some students not under teacher', function () {
    it('should send back a JSON object as response', function () {
        supertest(app)
            .post('/api/retrievefornotifications')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t2@gmail.com",
                notification: "Hello students! @s2@example.com @s6@example.com"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({recipients: ["s2@ex.com", "s3@ex.com", "s6@ex.com"]});
    });
});

// retrieve students positive workflow with some students suspended
describe('POST /api/retrievefornotifications positive workflow with some students suspended', function () {
    it('should send back a JSON object as response without suspended students', function () {
        supertest(app)
            .post('/api/retrievefornotifications')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t1@gmail.com",
                notification: "Hello students! @s2@example.com"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({recipients: ["s2@ex.com"]});
    });
});

// retrieve students teacher not present
describe('POST /api/retrievefornotifications teacher not present', function () {
    it('should send back status as 400', function () {
        supertest(app)
            .post('/api/retrievefornotifications')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t5@gmail.com",
                notification: "Hello students! @s2@example.com @s6@example.com"
            })
            .expect('Content-Type', /json/)
            .expect(400);
    });
});

// retrieve students malformed teacher
describe('POST /api/retrievefornotifications malformed teacher', function () {
    it('should send back status as 422', function () {
        supertest(app)
            .post('/api/retrievefornotifications')
            .set('Content-Type', 'application/json')
            .send({
                teacher1: "t1@gmail.com",
                notification: "Hello students! @s2@example.com @s6@example.com"
            })
            .expect('Content-Type', /json/)
            .expect(422);
    });
});

// retrieve students malformed notification
describe('POST /api/retrievefornotifications malformed notification', function () {
    it('should send back status as 422', function () {
        supertest(app)
            .post('/api/retrievefornotifications')
            .set('Content-Type', 'application/json')
            .send({
                teacher: "t1@gmail.com",
                notification1: "Hello students! @s2@example.com @s6@example.com"
            })
            .expect('Content-Type', /json/)
            .expect(422);
    });
});
