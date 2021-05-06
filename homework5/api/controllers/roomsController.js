const { roomsService } = require('../services');
const roomsController = {};

roomsController.getRooms = async (req, res) => {
  const rooms = await roomsService.getRooms();
  res.status(200).json({
    rooms,
  });
};

roomsController.getRoomById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const room = await roomsService.getRoomById(id);
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

roomsController.createRoom = async (req, res) => {
  const { roomNumber } = req.body;
  
  if (!roomNumber) {
    return res.status(400).json({
      error: 'Roomnumber is missing',
    });
  }
  const room = {
    roomNumber,
  };
  const id = await roomsService.createRoom(room);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating room',
    });
  }
  return res.status(201).json({
    id,
  });
};

roomsController.deleteRoom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if room exists
  const room = await roomsService.getRoomById(id);
  if (!room) {
    return res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
  const success = await roomsService.deleteRoom(id);
  if (!success) {
    res.status(500).json({
      error: 'Something went wrong while deleting room',
    });
  }
  return res.status(204).end();
};

roomsController.updateRoom = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { roomNumber } = req.body;
  if (!roomNumber) {
    return res.status(400).json({
      error: 'No roomNumber provided',
    });
  }
  const category = await roomsService.getRoomById(id);
  if (!category) {
    return res.status(400).json({
      error: `No room found with id: ${id}`,
    });
  }
  const roomToUpdate = {
    id,
    roomNumber,
  };
  const success = await roomsService.updateRoom(roomToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating roomnumber',
    });
  }
  return res.status(200).json({
    success: true,
  });
};

module.exports = roomsController;
