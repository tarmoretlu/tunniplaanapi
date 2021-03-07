const express = require('express');
const config = require('./config');
//const database = require('./database');

const {
  teachersRoutes,
  commentsRoutes,
  roomsRoutes,
  timeslotsRoutes,
  coursesRoutes,
  subjectsRoutes,
  timetablesRoutes,
  usersRoutes,
} = require('./api/routes');
const { logger } = require('./api/middlewares');
/*
const commentsRoutes = require('./api/routes/commentsRoutes');
const teachersRoutes = require('./api/routes/teachersRoutes');
const roomsRoutes = require('./api/routes/roomsRoutes');
const timeslotsRoutes = require('./api/routes/timeslotsRoutes');
const coursesRoutes = require('./api/routes/coursesRoutes');
const subjectsRoutes = require('./api/routes/subjectsRoutes');
const timetablesRoutes = require('./api/routes/timetablesRoutes');
const usersRoutes = require('./api/routes/usersRoutes');
*/
const app = express();
const { port } = config || 3000;
/*
const logger = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};
*/
// Middleware for creating req.body in express app
app.use(express.json());
app.use(logger);
// Routes
app.use('/comments', commentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/rooms', roomsRoutes);
app.use('/timeslots', timeslotsRoutes);
app.use('/courses', coursesRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/timetables', timetablesRoutes);
app.use('/users', usersRoutes);
// Logger middleware
app.use(logger);


// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
