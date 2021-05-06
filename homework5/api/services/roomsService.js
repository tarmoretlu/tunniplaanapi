const db = require('../../db');

const roomsService = {};

// Returns list of rooms
roomsService.getRooms = async () => {
  const rooms = await db.query(
    `SELECT
      R.id, R.roomNumber
    FROM
      rooms R
    WHERE
    R.deleted = 0`,
  );
  return rooms;
};

// Find room by id. Returns room if found or false.
roomsService.getRoomById = async (id) => {
  const room = await db.query(
    `SELECT
    R.id, R.roomNumber
    FROM
      rooms R
    WHERE
    R.id = ? AND R.deleted = 0`, [id],
  );
  if (!room) return false;
  return room;
};

// Creates new room, returns id on new room
roomsService.createRoom = async (newRoom) => {
  const check = await db.query('SELECT id FROM rooms WHERE roomNumber = ?', [newRoom.roomNumber]);
    if (check != 0){
  
      return check[0].id;

    } else {  
      const result = await db.query('INSERT INTO rooms SET ?', [newRoom]);
      return result.insertId;
    }
  


  //const result = await db.query('INSERT INTO rooms SET ?', [newRoom]);
  //return result.insertId;
};

// Deletes room
roomsService.deleteRoom = async (id) => {
  await db.query('UPDATE rooms SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates room
roomsService.updateRoom = async (room) => {
  await db.query('UPDATE rooms SET roomNumber = ? WHERE id = ?', [room.roomNumber, room.id]);
  return true;
};

module.exports = roomsService;
