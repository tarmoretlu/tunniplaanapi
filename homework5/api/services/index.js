const teachersService = require('./teachersService');
const commentsService = require('./commentsService');
const roomsService = require('./roomsService');
const timeslotsService = require('./timeslotsService');
const coursesService = require('./coursesService');
const subjectsService = require('./subjectsService');
const timetablesService = require('./timetablesService');
const usersService = require('./usersService');

const jwtService = require('./jwtService');
const hashService = require('./hashService');

module.exports = {
  teachersService,
  commentsService,
  roomsService,
  timeslotsService,
  coursesService,
  subjectsService,
  timetablesService,
  usersService,
  jwtService,
  hashService,
};
