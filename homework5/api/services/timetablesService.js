const db = require('../../db');
const timeslotsService = require('./timeslotsService');
const roomsService = require('./roomsService');
const commentsService = require('./commentsService');
const coursesService = require('./coursesService');
const subjectsService = require('./subjectsService');
const timetablesService = {};

// Returns all timetables
timetablesService.getTimetables = async () => {
  const timetables = await db.query(
  `SELECT
    T.id, T.date, TS.startTime, TS.endTime, R.roomNumber, C.commentContent, CO.courseName, SB.subjectCode, SB.subjectName,
    TC.teacherName, concat(U.firstName,' ',U.lastName) AS publisher
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
    T.id, T.date, TS.startTime, TS.endTime, R.roomNumber, C.commentContent, CO.courseName, SB.subjectCode, SB.subjectName,
    TC.teacherName, concat(U.firstName,' ',U.lastName) AS publisher
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
  //console.log(newTimetable);
  const timetableToCreate = {};
 
  const timeslot = {
    startTime: newTimetable.startTime,
    endTime: newTimetable.endTime,
  };
 
  const room = {
    roomNumber: newTimetable.roomNumber
  };

  const comment = {
    commentContent: newTimetable.commentContent
  };

  const course = {
    courseName: newTimetable.courseName
  };

  const subject = {
    subjectCode: newTimetable.subjectCode
    
  };

  timetableToCreate.date = newTimetable.date;
  timetableToCreate.timeslots_id = await timeslotsService.createTimeslot(timeslot);
 // timetableToCreate.timeslots_id = await timeslotsService.createTimeslot(newTimetable.startTime, newTimetable.endTime);
  timetableToCreate.rooms_id = await roomsService.createRoom(room);
  timetableToCreate.comments_id = await commentsService.createComment(comment);
  timetableToCreate.courses_id = await coursesService.createCourse(course);
  timetableToCreate.subjects_id = await subjectsService.createSubject(subject);
  timetableToCreate.users_id = 2;
  //console.log(timetableToCreate);



  if (!timetableToCreate.subjects_id){
    return 0;
  } else {
    
    const result = await db.query('INSERT INTO timetables SET ?', [timetableToCreate]);
    return result.insertId;
  }


 
};
//Updates timetable

timetablesService.updateTimetable = async (timetable) => {
  const timetableToUpdate = {};
  console.log(timetable);
 
  const timeslot = {
    startTime: timetable.startTime,
    endTime: timetable.endTime,
  };
  const room = {
    roomNumber: timetable.roomNumber
  };
  const comment = {
    commentContent: timetable.commentContent
  };
  const course = {
    courseName: timetable.courseName
  };
  const subject = {
    subjectCode: timetable.subjectCode
  };

  if (timetable.date) {
    timetableToUpdate.date = timetable.date;
  }
  if (timetable.startTime || timetable.endTime) {
    timetableToUpdate.timeslots_id = await timeslotsService.createTimeslot(timeslot);
  }
  if (timetable.roomNumber) {
    timetableToUpdate.rooms_id = await roomsService.createRoom(room);
  }
  if (timetable.commentContent) {
    timetableToUpdate.comments_id = await commentsService.createComment(comment);
  }
  if (timetable.courseName) {
    timetableToUpdate.courses_id = await coursesService.createCourse(course);
  }
  if (timetable.subjectCode) {
    timetableToUpdate.subjects_id = await subjectsService.createSubject(subject);
  }

if (timetableToUpdate.subjects_id===0){
  return false;
} else {

  await db.query('UPDATE timetables SET ? WHERE id = ?', [timetableToUpdate, timetable.id]);
  return true;
}
  
};


// Deletes timetable
timetablesService.deleteTimetable = async (id) => {
  await db.query('UPDATE timetables SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

module.exports = timetablesService;
