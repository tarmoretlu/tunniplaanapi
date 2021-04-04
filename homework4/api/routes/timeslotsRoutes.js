const express = require('express');
const { timeslotsController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();


/**
 * Users API endpoints
 */
router
.use(isLoggedIn)
.get('/', isAdmin, timeslotsController.getTimeslots)
.get('/:id', isAdmin, timeslotsController.getTimeslotById)
.post('/', isAdmin, timeslotsController.createTimeslot)
.patch('/:id', isAdmin, timeslotsController.updateTimeslot)
.delete('/:id', isAdmin, timeslotsController.deleteTimeslot);

module.exports = router;
