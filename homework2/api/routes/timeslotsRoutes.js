const express = require('express');
const timeslotsController = require('../controllers/timeslotsController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', timeslotsController.getTimeslots);
router.get('/:id', timeslotsController.getTimeslotById);
router.post('/', timeslotsController.createTimeslot);
router.patch('/:id', timeslotsController.updateTimeslot);
router.delete('/:id', timeslotsController.deleteTimeslot);

module.exports = router;
