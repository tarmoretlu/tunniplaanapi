const database = require('../../database');

const timeslotsService = {};

// Returns list of timeslots
timeslotsService.getTimeslots = () => {
  const { timeslots } = database;
  return timeslots;
};

// Find timeslot by id. Returns timeslot if found or false.
timeslotsService.getTimeslotById = (id) => {
  const timeslot = database.timeslots.find((element) => element.id === id);
  if (timeslot) {
    return timeslot;
  }
  return false;
};

// Creates new timeslot, returns id on new timeslot
timeslotsService.createTimeslot = (newTimeslot) => {
  const id = database.timeslots.length + 1;
  const timeslot = {
    id,
    ...newTimeslot,
  };
  database.timeslots.push(timeslot);
  return id;
};

// Deletes timeslot
timeslotsService.deleteTimeslot = (id) => {
  // Find timeslot index
  const index = database.timeslots.findIndex((element) => element.id === id);
  // Remove timeslot from 'database'
  database.timeslots.splice(index, 1);
  return true;
};

// Updates timeslot
timeslotsService.updateTimeslot = (timeslot) => {
  const index = database.timeslots.findIndex((element) => element.id === timeslot.id);
  if (timeslot.startTime) {
    database.timeslots[index].startTime = timeslot.startTime;
  }
  if (timeslot.endTime) {
    database.timeslots[index].endTime = timeslot.endTime;
  }
  return true;
};

module.exports = timeslotsService;
