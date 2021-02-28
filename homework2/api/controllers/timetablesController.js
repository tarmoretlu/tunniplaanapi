const timetablesService = require('../services/timetablesService');

const timetablesController = {};

timetablesController.getTimetables = (req, res) => {
  const timetables = timetablesService.getTimetables();
  res.status(200).json({
    timetables,
  });
  
};

/*
app.get('/excuses', (req, res) => {
  const categoryId = parseInt(req.query.categoryId, 10);
  if (categoryId) {
    const category = findCategoryById(categoryId);
    if (category) {
      const excusesInCategory = database.excuses.filter(
        (element) => element.categoryId === categoryId,
      );
      if (excusesInCategory) {
        const excusesInCategoryWithCreator = getExcusesWithCreator(excusesInCategory);
        const excusesWithComments = getExcusesWithComments(excusesInCategoryWithCreator);
        const excusesWithCategory = getExcusesWithCategory(excusesWithComments);
        res.status(200).json({
          excuses: excusesWithCategory,
        });
      } else {
        res.status(400).json({
          error: `No excuse found with categoryId: ${categoryId}`,
        });
      }
    } else {
      res.status(400).json({
        error: `No excuse found with categoryId: ${categoryId}`,
      });
    }
  }
  const excusesWithCreator = getExcusesWithCreator(database.excuses);
  const excusesWithComments = getExcusesWithComments(excusesWithCreator);
  const excusesWithCategory = getExcusesWithCategory(excusesWithComments);
  res.status(200).json({
    excuses: excusesWithCategory,
  });
});

*/


timetablesController.getTimetableById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const timetable = timetablesService.getTimetableById(id);
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
/*
        courseId: 1,
        date: "20.02.2021",
        timeslotId: 1,
        subjectId: 1,
        teacherId: 1,
        roomId: 1,
        commentId: 1,
*/

timetablesController.createTimetable = (req, res) => {
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
    const id = timetablesService.createTimetable(timetable);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Timetable parameters are missing',
    });
  }
};

timetablesController.deleteTimetable = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if timetable exists
  const timetable = timetablesService.getTimetableById(id);
  if (timetable) {
    const success = timetablesService.deleteTimetable(id);
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
