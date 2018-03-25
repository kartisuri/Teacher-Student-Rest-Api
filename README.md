# Teacher-Student-Rest-Api

Hosted on Heroku

Stories:
```
1. As a teacher, I want to be able to register one or more students to a specified teacher.
A teacher can register multiple students. A student can also be registered to multiple teachers.

Endpoint: POST https://teacher-student-rest-api.herokuapp.com/api/register

Headers: Content-Type: application/json

Request JSON:
{
  "teacher": "teacherken@gmail.com"
  "students":
    [
      "studentjon@example.com"
    ]
}

Response: HTTP Code 204
```

```
2. As a teacher, I want to be able to provide a list of teachers and retrieve a list of students common to all of them (i.e. students who are registered to ALL of them).

Endpoint: POST https://teacher-student-rest-api.herokuapp.com/api/commonstudents
Headers: Content-Type: application/json

Example 1:
Request: POST https://teacher-student-rest-api.herokuapp.com/api/commonstudents
Request JSON:
{
  "teacher": 
  [ 
  	"teacherken@gmail.com" 
  ]
}

Response JSON:
{
  "students" :
    [
      "commonstudent1@gmail.com", 
      "commonstudent2@gmail.com",
      "student_only_under_teacher_ken@gmail.com"
    ]
}

Example 2:
Request: POST https://teacher-student-rest-api.herokuapp.com/api/commonstudents
Request JSON:
{
  "teacher": 
  [ 
  	"teacherken@gmail.com",
  	"teacherjoe@gmail.com" 
  ]
}

Response JSON:
{
  "students" :
    [
      "commonstudent1@gmail.com", 
      "commonstudent2@gmail.com"
    ]
}
```

```
3. As a teacher, I want to be able to suspend a specified student.

Endpoint: POST https://teacher-student-rest-api.herokuapp.com/api/suspend
Headers: Content-Type: application/json

Request JSON:
{
  "student" : "studentmary@gmail.com"
}

Response: HTTP Code 204
```

```
4. As a teacher, I should be able to retrieve all student emails that can receive notifications from a teacher's email. Conditions for receiving notification from i.e. 'teacherken@example.com': has not been suspended, and at least one of the following:
1.	Is registered with “teacherken@example.com"
2.	has been @mentioned in the notification
Response should also not contain duplicate student names.

Endpoint: POST https://teacher-student-rest-api.herokuapp.com/api/retrievefornotifications
Headers: Content-Type: application/json

Request JSON:
{
  "teacher":  "teacherken@example.com",
  "notification": "Hello students! @studentagnes@example.com @studentmiche@example.com"
}

Response JSON:
{
  "recipients":
    [
      "original_student_under_teacher_ken@example.com",
      "studentagnes@example.com", 
      "studentmiche@example.com"
    ]   
}
```
