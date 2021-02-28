const express = require('express');
const timetablesController = require('../controllers/timetablesController');

const router = express.Router();

/**
 * Timetables API endpoints
 */
router.get('/', timetablesController.getTimetables);
router.get('/:id', timetablesController.getTimetableById);
router.post('/', timetablesController.createTimetable);
router.delete('/:id', timetablesController.deleteTimetable);

module.exports = router;
