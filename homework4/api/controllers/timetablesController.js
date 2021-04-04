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
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
     
      error: 'Timetable parameters are missing',
    });
  }
  
};
/*
timetablesController.createTimetable = async (req, res) => {
  const { courseId, date, timeslotId, subjectId, teacherId, roomId, commentId } = req.body;
  if (courseId && date && timeslotId && subjectId && teacherId && roomId && commentId) {
    const timetable = {
      courseId, 
      date, 
      timeslotId, 
      subjectId, 
      teacherId, 
      roomId, 
      commentId,
    };
    const id = await timetablesService.createTimetable(timetable);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Timetable parameters are missing',
    });
  }
};
*/
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
