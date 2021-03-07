const express = require('express');
const roomsController = require('../controllers/roomsController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
/**
 * Users API endpoints
 */
router.get('/', isLoggedIn, isAdmin, roomsController.getRooms);
router.get('/:id', isLoggedIn, isAdmin, roomsController.getRoomById);
router.post('/', isLoggedIn, isAdmin, roomsController.createRoom);
router.patch('/:id', isLoggedIn, isAdmin, roomsController.updateRoom);
router.delete('/:id', isLoggedIn, isAdmin, roomsController.deleteRoom);

module.exports = router;
