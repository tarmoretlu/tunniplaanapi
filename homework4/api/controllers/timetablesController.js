const { timetablesService } = require('../services');
const timetablesController = {};

timetablesController.getTimetables = async (req, res) => {
  const timetables = await timetablesService.getTimetables();
  res.status(200).json({
    timetables,
  });
  
};


timetablesController.getTimetableById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const timetable = await timetablesService.getTimetableById(id);
  if (timetable) {
    res.status(200).json({
      timetable,
    });
  } else {
    res.status(400).json({
      error: `No timetable found with id: ${id}`,
    });
  }
};


timetablesController.createTimetable = async (req, res) => {
  const { date, startTime, endTime, subjectCode, courseName, roomNumber, commentContent } = req.body;

  if (date && startTime && endTime && subjectCode && courseName && roomNumber && commentContent) {
    const timetable = {
      date,
      startTime,
      endTime,
      subjectCode,
      courseName,
      roomNumber,
      commentContent,
    };
    
    const id = await timetablesService.createTimetable(timetable);


      if (id===0) {
        res.status(400).json({
          error: `Record not added, as there is no such subject code!`,
        });
      } else {
        res.status(201).json({
          id,
        });
      }
   


  } else {
    res.status(400).json({
     
      error: 'Timetable parameters are missing',
    });
  }
  
};

timetablesController.updateTimetable = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { date, startTime, endTime, roomNumber, commentContent, courseName, subjectCode } = req.body;
  if (id && (date || startTime || endTime || roomNumber || commentContent || courseName || subjectCode)) {
    const timetable = await timetablesService.getTimetableById(id);
    if (timetable) {
      const timetableToUpdate = {
        id,
        date,
        startTime,
        endTime,
        roomNumber,
        commentContent,
        courseName,
        subjectCode,
      };
      const success = await timetablesService.updateTimetable(timetableToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'The subject code is not available, create it first!',
        });
      }
    } else {
      res.status(400).json({
        error: `No timetable found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Timetable parameters missing',
    });
  }
};


timetablesController.deleteTimetable = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if timetable exists
  const timetable = await timetablesService.getTimetableById(id);
  if (timetable) {
    const success = await timetablesService.deleteTimetable(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting timetable.',
      });
    }
  } else {
    res.status(400).json({
      error: `No timetable found with id: ${id}`,
    });
  }
};

module.exports = timetablesController;
