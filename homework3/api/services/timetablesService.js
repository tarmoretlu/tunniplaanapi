const database = require('../../database');

const timetablesService = {};

// Returns all timetables
timetablesService.getTimetables = () => {
  const { timetables } = database;
  
  const timetablesWithData = timetables.map((timetable) => {
    const courses = database.courses.find((course) => course.id === timetable.courseId);
    const timeslots = database.timeslots.find((timeslot) => timeslot.id === timetable.timeslotId);
    const subjects = database.subjects.find((subject) => subject.id === timetable.subjectId);
    const teachers = database.teachers.find((teacher) => teacher.id === timetable.teacherId);
    const rooms = database.rooms.find((room) => room.id === timetable.roomId);
    const comments = database.comments.find((comment) => comment.id === timetable.commentId);
    return {
      ...timetable,
      courses,
      timeslots,
      subjects,
      teachers,
      rooms,
      comments,
    };
  });
  return timetablesWithData;
};

// Find timetable by id. Returns timetable if found or false.
timetablesService.getTimetableById = (id) => {
  const timetable = database.timetables.find((element) => element.id === id);
  if (timetable){
    return timetable;
  } else {
    return false;
  }

};

// Creates new timetable
timetablesService.createTimetable = (newTimetable) => {
  const id = database.timetables.length + 1;
  const timetable = {
    id,
    ...newTimetable,
  };
  database.timetables.push(timetable);
  return id;
};

// Deletes timetable
timetablesService.deleteTimetable = (id) => {
  // Find timetable index
  const index = database.timetables.findIndex((element) => element.id === id);
  // Remove timetable from 'database'
  database.timetables.splice(index, 1);
  return true;
};

module.exports = timetablesService;
