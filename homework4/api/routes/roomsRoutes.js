const express = require('express');
const { roomsController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

/**
 * Users API endpoints
 */
router
.use(isLoggedIn)
.get('/', isAdmin, roomsController.getRooms)
.get('/:id', isAdmin, roomsController.getRoomById)
.post('/', isAdmin, roomsController.createRoom)
.patch('/:id', isAdmin, roomsController.updateRoom)
.delete('/:id', isAdmin, roomsController.deleteRoom);

module.exports = router;
