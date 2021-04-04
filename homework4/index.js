/* eslint-disable no-console */
const express = require('express');
const config = require('./config');

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

const app = express();
const { port } = config || 3000;

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
