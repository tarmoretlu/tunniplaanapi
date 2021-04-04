const db = require('../../db');
const timetablesService = {};

// Returns all timetables
timetablesService.getTimetables = async () => {
  const timetables = await db.query(
  `SELECT
    T.id, date(T.date) AS Date, TS.startTime, TS.endTime, R.roomNumber, C.commentContent, CO.courseName, SB.subjectCode, SB.subjectName,
    TC.teacherName, concat(U.firstName,' ',U.lastName) AS Publisher
  FROM
  timetables T
    INNER JOIN timeslots TS ON T.timeslots_id = TS.id
    INNER JOIN rooms R ON T.rooms_id = R.id
    INNER JOIN comments C ON T.comments_id = C.id
    INNER JOIN courses CO ON T.courses_id = CO.id
    INNER JOIN subjects SB ON T.subjects_id = SB.id
    INNER JOIN users U ON T.users_id = U.id
    INNER JOIN teachers TC ON SB.teachers_id = TC.id
  WHERE
  T.deleted = 0`,
  );
  return timetables;
};

// Find timetable by id. Returns timetable if found or false.
timetablesService.getTimetableById = async (id) => {
  const timetable = await db.query(
  `SELECT
    T.id, date(T.date) AS Date, TS.startTime, TS.endTime, R.roomNumber, C.commentContent, CO.courseName, SB.subjectCode, SB.subjectName,
    TC.teacherName, concat(U.firstName,' ',U.lastName) AS Publisher
  FROM
  timetables T
    INNER JOIN timeslots TS ON T.timeslots_id = TS.id
    INNER JOIN rooms R ON T.rooms_id = R.id
    INNER JOIN comments C ON T.comments_id = C.id
    INNER JOIN courses CO ON T.courses_id = CO.id
    INNER JOIN subjects SB ON T.subjects_id = SB.id
    INNER JOIN users U ON T.users_id = U.id
    INNER JOIN teachers TC ON SB.teachers_id = TC.id
  WHERE
    T.id = ? AND T.deleted = 0`, [id],
  );
  if (!timetable) return false;
  return timetable;

};

// Creates new timetable
timetablesService.createTimetable = async (newTimetable) => {
  console.log(newTimetable);
  const timetableToCreate = {};
 
  timetableToCreate.date = newTimetable.date;
  timetableToCreate.timeslots_id = await timeslotsService.createTimeslot(newTimetable.startTime, newTimetable.endTime);
  timetableToCreate.rooms_id = await roomsService.createRoom(newTimetable.roomNumber);
  timetableToCreate.comments_id = await commentsService.createComment(newTimetable.commentContent);
  timetableToCreate.courses_id = await coursesService.createCourse(newTimetable.courseName);
  timetableToCreate.subjects_id = await subjectsService.createSubject(newTimetable.subjectCode);
  timetableToCreate.users_id = 2;
  
  console.log(timetableToCreate);


  const result = await db.query('INSERT INTO timetables SET ?', [timetableToCreate]);

  return result.insertId;
};

// Deletes timetable
timetablesService.deleteTimetable = async (id) => {
  await db.query('UPDATE timetables SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

module.exports = timetablesService;
