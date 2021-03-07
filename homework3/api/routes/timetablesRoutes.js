const express = require('express');
const timetablesController = require('../controllers/timetablesController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');

/**
 * Timetables API endpoints
 */
router.get('/', timetablesController.getTimetables);
router.get('/:id', timetablesController.getTimetableById);
router.post('/', isLoggedIn, isAdmin, timetablesController.createTimetable);
router.delete('/:id', isLoggedIn, isAdmin,timetablesController.deleteTimetable);

module.exports = router;
