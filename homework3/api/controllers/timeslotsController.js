const timeslotsService = require('../services/timeslotsService');

const timeslotsController = {};

timeslotsController.getTimeslots = (req, res) => {
  const timeslots = timeslotsService.getTimeslots();
  res.status(200).json({
    timeslots,
  });
};

timeslotsController.getTimeslotById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const timeslot = timeslotsService.getTimeslotById(id);
  if (timeslot) {
    res.status(200).json({
      timeslot,
    });
  } else {
    res.status(400).json({
      error: `No timeslot found with id: ${id}`,
    });
  }
};

timeslotsController.createTimeslot = (req, res) => {
  const { startTime, endTime } = req.body;
  if (startTime && endTime) {
    const timeslot = {
      startTime,
      endTime
    };
    const id = timeslotsService.createTimeslot(timeslot);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Timeslots parameter is missing',
    });
  }
};

timeslotsController.deleteTimeslot = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const timeslot = timeslotsService.getTimeslotById(id);
  if (timeslot) {
    const success = timeslotsService.deleteTimeslot(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting timeslot',
      });
    }
  } else {
    res.status(400).json({
      error: `No timeslot found with id: ${id}`,
    });
  }
};

timeslotsController.updateTimeslot = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { startTime, endTime } = req.body;
  if (id && startTime && endTime) {
    const timeslot = timeslotsService.getTimeslotById(id);
    if (timeslot) {
      const timeslotToUpdate = {
        id,
        startTime,
        endTime,
      };
      const success = timeslotsService.updateTimeslot(timeslotToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating timeslot',
        });
      }
    } else {
      res.status(400).json({
        error: `No timeslot found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id or timeslot name is missing',
    });
  }
};

module.exports = timeslotsController;
