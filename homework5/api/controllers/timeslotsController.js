const { timeslotsService } = require('../services');
const timeslotsController = {};

timeslotsController.getTimeslots = async (req, res) => {
  const timeslots = await timeslotsService.getTimeslots();
  res.status(200).json({
    timeslots,
  });
};

timeslotsController.getTimeslotById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const timeslot = await timeslotsService.getTimeslotById(id);
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

timeslotsController.createTimeslot = async (req, res) => {
  const { startTime, endTime } = req.body;
 
  if (!startTime || !endTime) {
    return res.status(400).json({
      error: 'One or more parameters are missing',
    });
  }
  const timeslot = {
    startTime,
    endTime
  };
  const id = await timeslotsService.createTimeslot(timeslot);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating timeslot',
    });
  }
  return res.status(201).json({
    id,
  });
 // if (startTime && endTime) {
  //  const timeslot = {
 //     startTime,
 //     endTime
 //   };
 //   const id = await timeslotsService.createTimeslot(timeslot);
 //   res.status(201).json({
 //     id,
 //   });
 // } else {
 //   res.status(400).json({
 //     error: 'Timeslots parameter is missing',
 //   });
 // }
};

timeslotsController.deleteTimeslot = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const timeslot = await timeslotsService.getTimeslotById(id);
  if (timeslot) {
    const success = await timeslotsService.deleteTimeslot(id);
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

timeslotsController.updateTimeslot = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { startTime, endTime } = req.body;
  if (id && (startTime || endTime)) {
    const timeslot = await timeslotsService.getTimeslotById(id);
    if (timeslot) {
      const timeslotToUpdate = {
        id,
        startTime,
        endTime,
      };
      const success = await timeslotsService.updateTimeslot(timeslotToUpdate);
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
