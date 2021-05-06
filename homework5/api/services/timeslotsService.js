const db = require('../../db');
const timeslotsService = {};

// Returns list of timeslots
timeslotsService.getTimeslots = async () => {
  const timeslots = await db.query(
    `SELECT
      T.id, T.startTime, T.endTime
    FROM
    timeslots T
    WHERE
    T.deleted = 0`,
  );
  return timeslots;
};

// Find timeslot by id. Returns timeslot if found or false.
timeslotsService.getTimeslotById = async (id) => {
  const timeslot = await db.query(
  `SELECT
    T.id, T.startTime, T.endTime
  FROM
    timeslots T
  WHERE
   T.id = ? AND T.deleted = 0`, [id],
  );
  if (!timeslot) return false;
  return timeslot;
};

// Creates new timeslot, returns id on new timeslot
timeslotsService.createTimeslot = async (newTimeslot) => {
  const check = await db.query('SELECT id FROM timeslots WHERE startTime = ? AND endTime = ?', [newTimeslot.startTime, newTimeslot.endTime]);
    if (check != 0){
      return check[0].id;
    } else {  
      const result = await db.query('INSERT INTO timeslots SET ?', [newTimeslot]);
      return result.insertId;
    }
};

// Deletes timeslot
timeslotsService.deleteTimeslot = async (id) => {
  await db.query('UPDATE timeslots SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates timeslot
timeslotsService.updateTimeslot = async (timeslot) => {
  const timeslotToUpdate = {};
  if (timeslot.startTime) {
    timeslotToUpdate.startTime = timeslot.startTime;
  }
  if (timeslot.endTime) {
    timeslotToUpdate.endTime = timeslot.endTime;
  }
  
  await db.query('UPDATE timeslots SET ? WHERE id = ?', [timeslotToUpdate, timeslot.id]);
  return true;
  
  
  
  //await db.query('UPDATE timeslots SET courseName = ? WHERE id = ?', [course.courseName, course.id]);
 // return true;
};

module.exports = timeslotsService;
