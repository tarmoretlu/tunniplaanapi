const database = require('../../database');

const roomsService = {};

// Returns list of rooms
roomsService.getRooms = () => {
  const { rooms } = database;
  return rooms;
};

// Find room by id. Returns room if found or false.
roomsService.getRoomById = (id) => {
  const room = database.rooms.find((element) => element.id === id);
  if (room) {
    return room;
  }
  return false;
};

// Creates new room, returns id on new room
roomsService.createRoom = (newRoom) => {
  const id = database.rooms.length + 1;
  const room = {
    id,
    ...newRoom,
  };
  database.rooms.push(room);
  return id;
};

// Deletes room
roomsService.deleteRoom = (id) => {
  // Find room index
  const index = database.rooms.findIndex((element) => element.id === id);
  // Remove room from 'database'
  database.rooms.splice(index, 1);
  return true;
};

// Updates room
roomsService.updateRoom = (room) => {
  const index = database.rooms.findIndex((element) => element.id === room.id);
  if (room.roomNumber) {
    database.rooms[index].roomNumber = room.roomNumber;
  }
  
  return true;
};

module.exports = roomsService;
