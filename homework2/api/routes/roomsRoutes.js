const express = require('express');
const roomsController = require('../controllers/roomsController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', roomsController.getRooms);
router.get('/:id', roomsController.getRoomById);
router.post('/', roomsController.createRoom);
router.patch('/:id', roomsController.updateRoom);
router.delete('/:id', roomsController.deleteRoom);

module.exports = router;
