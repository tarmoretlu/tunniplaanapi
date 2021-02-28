const coursesService = require('../services/coursesService');

const coursesController = {};

coursesController.getCourses = (req, res) => {
  const courses = coursesService.getCourses();
  res.status(200).json({
    courses,
  });
};

coursesController.getCourseById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = coursesService.getCourseById(id);
  if (course) {
    res.status(200).json({
      course,
    });
  } else {
    res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
};

coursesController.createCourse = (req, res) => {
  const { courseName } = req.body;
  if (courseName) {
    const course = {
      courseName
    };
    const id = coursesService.createCourse(course);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Courses name is missing',
    });
  }
};

coursesController.deleteCourse = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = coursesService.getCourseById(id);
  if (course) {
    const success = coursesService.deleteCourse(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting course',
      });
    }
  } else {
    res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
};

coursesController.updateCourse = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { courseName } = req.body;
  if (id && courseName) {
    const course = coursesService.getCourseById(id);
    if (course) {
      const courseToUpdate = {
        id,
        courseName,
      };
      const success = coursesService.updateCourse(courseToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating course',
        });
      }
    } else {
      res.status(400).json({
        error: `No course found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id or course name is missing',
    });
  }
};

module.exports = coursesController;
