const roomsService = require('../services/roomsService');
const roomsController = {};

roomsController.getRooms = (req, res) => {
  const rooms = roomsService.getRooms();
  res.status(200).json({
    rooms,
  });
};

roomsController.getRoomById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const room = roomsService.getRoomById(id);
  if (room) {
    res.status(200).json({
      room,
    });
  } else {
    res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
};

roomsController.createRoom = (req, res) => {
  const { roomNumber } = req.body;
  if (roomNumber) {
    const room = {
      roomNumber
    };
    const id = roomsService.createRoom(room);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Rooms number is missing',
    });
  }
};

roomsController.deleteRoom = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const room = roomsService.getRoomById(id);
  if (room) {
    const success = roomsService.deleteRoom(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting room',
      });
    }
  } else {
    res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
};

roomsController.updateRoom = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { roomNumber } = req.body;
  if (id && roomNumber) {
    const room = roomsService.getRoomById(id);
    if (room) {
      const roomToUpdate = {
        id,
        roomNumber,
      };
      const success = roomsService.updateRoom(roomToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating room',
        });
      }
    } else {
      res.status(400).json({
        error: `No room found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id or room number is missing',
    });
  }
};

module.exports = roomsController;
