## referral git link

https://github.com/geojimas/books-REST-API/blob/main/src/server.ts
https://github.com/luizcalaca/ts-node-joi-api/blob/main/src/services/userService.ts
https://github.com/saisilinus/node-express-mongoose-typescript-boilerplate/blob/master/src/modules/user/user.model.ts

new project
https://github.com/Kei-K23/express-mongo-typescript-starter/blob/main/src/models/user.model.ts

schools Collection

{
"\_id": "school_101",
"name": "Green Valley School",
"school_id": "school_101",
"start_time": "Green Valley School",

  <!-- "end_time": "Green Valley School", -->

"class_duration": 45,
"break_time": 30,
"break_time_started": 2, //after number of class
"address": {
"street": "12 Park Road",
"city": "Kolkata",
"state": "WB",
"pincode": "700001"
},
"contact": {
"phone": "+91-9999999999",
"email": "info@gvschool.com"
},
"created_at": "2025-08-18T11:00:00Z"
}

students Collection

{
"\_id": "stu_1001",
"school_id": "school_101",
"name": "Ravi Kumar",
"dob": "2010-04-15",
"gender": "M",
"class_id": "class_7A",
"roll_no": 12,
"guardian": {
"name": "Arun Kumar",
"relation": "Father",
"phone": "+91-8888888888"
},
"address": {
"city": "Kolkata",
"state": "WB"
},
"admission_date": "2020-06-01"
}

teachers Collection

{
"\_id": "teach_501",
"school_id": "school_101",
"name": "Anita Sharma",
"dob": "1980-03-20",
"gender": "F",
"subjects": ["Mathematics", "Physics"],
"classes": ["class_7A", "class_8B"],
"phone": "+91-7777777777",
"email": "anita.sharma@gvschool.com",
"joining_date": "2010-07-10"
}

classes Collection
{
"\_id": "class_7A",
"school_id": "school_101",
"name": "7th Grade - Section A",
"class_teacher": "teach_501",
"end_time": "Green Valley School",
"number_of_class": 7,
"subjects": [
{
"name": "Math",
"teacher_id": "teach_501"
},
{
"name": "English",
"teacher_id": "teach_502"
}
],
"students": [
"stu_1001",
"stu_1002",
"stu_1003"
],
"schedule": [
{
"day": "Monday",
"periods": [
{
"start": "09:00",
"end": "09:45",
"subject": "Math",
"teacher_id": "teach_501"
},
{
"start": "09:50",
"end": "10:35",
"subject": "English",
"teacher_id": "teach_502"
},
{
"start": "10:40",
"end": "11:25",
"subject": "Science",
"teacher_id": "teach_503"
}
]
},
{
"day": "Tuesday",
"periods": [
{
"start": "09:00",
"end": "09:45",
"subject": "History",
"teacher_id": "teach_504"
},
{
"start": "09:50",
"end": "10:35",
"subject": "Math",
"teacher_id": "teach_501"
}
]
}
]
}

attendance Collection

{
"\_id": "att_20250818_class_7A",
"class_id": "class_7A",
"date": "2025-08-18",
"records": [
{
"student_id": "stu_1001",
"status": "Present",
"check_in": "09:05",
"check_out": "15:30"
},
{
"student_id": "stu_1002",
"status": "Absent"
},
{
"student_id": "stu_1003",
"status": "Present",
"check_in": "09:00",
"check_out": "15:25"
}
],
"marked_at": "2025-08-18T09:10:00Z" // when attendance was recorded
}

exams Collection

{
"\_id": "exam_2025_midterm",
"school_id": "school_101",
"class_id": "class_7A",
"exam_type": "Mid Term",
"subjects": [
{ "subject": "Math", "date": "2025-09-01" },
{ "subject": "Science", "date": "2025-09-03" }
]
}

results Collection
{
"\_id": "result_stu_1001_midterm2025",
"student_id": "stu_1001",
"exam_id": "exam_2025_midterm",
"marks": [
{ "subject": "Math", "score": 88 },
{ "subject": "Science", "score": 92 }
],
"total": 180,
"grade": "A"
}

account Collection

{
"\_id": "fee_stu_1001_2025Q1",
"student_id": "stu_1001",
"school_id": "school_101",
"term": "2025-Q1",
"amount": 15000,
"paid": true,
"payment_date": "2025-01-15",
"method": "UPI"
}

### find absentees between two dates (week range)

async function getWeeklyAbsentees(classId: string, startDate: Date, endDate: Date) {
const result = await Attendance.aggregate([
{
$match: {
class_id: classId,
date: { $gte: startDate, $lte: endDate }
}
},
{ $unwind: "$records" },
{ $match: { "records.status": "Absent" } },
{
$project: {
_id: 0,
student_id: "$records.student_id",
date: 1
}
},
{ $sort: { date: 1 } }
]);

return result;
}

### find the list of teachers on which class for the specific time priod

async function getTeachersForTime(classId: string, day: string, time: string) {
const result = await ClassModel.aggregate([
{ $match: { _id: classId } },
{ $unwind: "$schedule" },
{ $match: { "schedule.day": day } },
{ $unwind: "$schedule.periods" },
{
$match: {
"schedule.periods.start": { $lte: time }, // period start before/equal to given time
"schedule.periods.end": { $gte: time } // period end after/equal to given time
}
},
{
$project: {
_id: 0,
teacher_id: "$schedule.periods.teacher_id",
subject: "$schedule.periods.subject",
timeSlot: {
start: "$schedule.periods.start",
end: "$schedule.periods.end"
}
}
}
]);

return result;
}

## ind the class and timing of a specific teacher

async function getTeacherSchedule(teacherId: string) {
const result = await ClassModel.aggregate([
{ $unwind: "$schedule" },
{ $unwind: "$schedule.periods" },
{ $match: { "schedule.periods.teacher_id": teacherId } },
{
$project: {
_id: 0,
class_id: "$_id",
class_name: "$name",
day: "$schedule.day",
subject: "$schedule.periods.subject",
start: "$schedule.periods.start",
end: "$schedule.periods.end"
}
},
{ $sort: { day: 1, start: 1 } }
]);

return result;
}
