const { expect } = require('chai');
const { roomsService } = require('../api/services');


const newRoom = {
    roomNumber: 'test_room_uus',
 
};

const newRoomUpdated = {
    roomNumber: 'test_room_uuendatud',
  
};

let idToBeUpdated;

describe('Rooms service', function () {
  describe('Get Rooms', function () {
    it('should return array of rooms', async function () {
      rooms = await roomsService.getRooms();
      expect(rooms).to.be.a('array');
    });
    it('should contain at least 1 room', async function () {
      expect(rooms.length).to.be.gt(1);
    });
  });


  describe('GetRoom by ID', function () {
    it('should return room array', async function () {
      const room = await roomsService.getRoomById(2);
      expect(room).to.be.a('array');
    });
    it('should return false if ID not existing', async function () {
      const room = await roomsService.getRoomById(99999);
      expect(room).to.be.empty;
    });
  });



  describe('Create room', function () {
    it('should return the last inserted ID', async function () {
      const room = await roomsService.createRoom(newRoom);
      expect(room).to.be.a('number');
      idToBeUpdated = room;
    });

  });

  describe('Update room', function () {
    it('should return true if update successful', async function () {
      newRoomUpdated.id = idToBeUpdated;
      const room = await roomsService.updateRoom(newRoomUpdated);
      expect(room).to.be.true;
    });
  });

  describe('Delete room', function () {
    it('should return true if deleted', async function () {
      const room = await roomsService.deleteRoom(idToBeUpdated);
      expect(room).to.be.true;
    });
  });

});
