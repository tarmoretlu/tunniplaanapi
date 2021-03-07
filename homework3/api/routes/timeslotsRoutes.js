const express = require('express');
const timeslotsController = require('../controllers/timeslotsController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
/**
 * Users API endpoints
 */
router.get('/', isLoggedIn, isAdmin, timeslotsController.getTimeslots);
router.get('/:id', isLoggedIn, isAdmin, timeslotsController.getTimeslotById);
router.post('/', isLoggedIn, isAdmin, timeslotsController.createTimeslot);
router.patch('/:id', isLoggedIn, isAdmin, timeslotsController.updateTimeslot);
router.delete('/:id', isLoggedIn, isAdmin, timeslotsController.deleteTimeslot);

module.exports = router;
