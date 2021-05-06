const { expect } = require('chai');
const { timeslotsService } = require('../api/services');


const newTimeslot = {
    startTime: '14:20', 
    endTime: '14:21', 
    
  
};

const newTimeslotUpdated = {
    startTime: '14:22', 
    endTime: '14:23', 
};

let idToBeUpdated;

describe('Timeslots service', function () {
  describe('Get Timeslots', function () {
    it('should return array of timeslots', async function () {
      timeslots = await timeslotsService.getTimeslots();
      expect(timeslots).to.be.a('array');
    });
    it('should contain at least 1 timeslot', async function () {
      expect(timeslots.length).to.be.gt(1);
    });
  });


  describe('GetTimeslot by ID', function () {
    it('should return timeslot array', async function () {
      const timeslot = await timeslotsService.getTimeslotById(2);
      expect(timeslot).to.be.a('array');
    });
    it('should return false if ID not existing', async function () {
      const timeslot = await timeslotsService.getTimeslotById(99999);
      expect(timeslot).to.be.empty;
    });
  });



  describe('Create timeslot', function () {
    it('should return the last inserted ID', async function () {
      const timeslot = await timeslotsService.createTimeslot(newTimeslot);
      expect(timeslot).to.be.a('number');
      idToBeUpdated = timeslot;
    });

  });

  describe('Update timeslot', function () {
    it('should return true if update successful', async function () {
      newTimeslotUpdated.id = idToBeUpdated;
      const timeslot = await timeslotsService.updateTimeslot(newTimeslotUpdated);
      expect(timeslot).to.be.true;
    });
  });

  describe('Delete timeslot', function () {
    it('should return true if deleted', async function () {
      const timeslot = await timeslotsService.deleteTimeslot(idToBeUpdated);
      expect(timeslot).to.be.true;
    });
  });

});
