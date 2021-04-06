const express = require('express');
const { timetablesController } = require('../controllers');

const router = express.Router();
const { isLoggedIn, isAdmin } = require('../middlewares');



/*
const express = require('express');
const timetablesController = require('../controllers/timetablesController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
*/
/**
 * Timetables API endpoints
 */
router
.get('/', timetablesController.getTimetables)
.get('/:id', timetablesController.getTimetableById)
.use(isLoggedIn)
.post('/', isAdmin, timetablesController.createTimetable)
.patch('/:id', isAdmin, timetablesController.updateTimetable)
.delete('/:id', isAdmin,timetablesController.deleteTimetable);

module.exports = router;
