const { coursesService } = require('../services');
const coursesController = {};

coursesController.getCourses = async (req, res) => {
  const courses = await coursesService.getCourses();
  res.status(200).json({
    courses,
  });
};

coursesController.getCourseById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await coursesService.getCourseById(id);
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

coursesController.createCourse = async (req, res) => {
  const { courseName } = req.body;
  
  if (!courseName) {
    return res.status(400).json({
      error: 'Name of the course is missing',
    });
  }
  const course = {
    courseName,
  };
  const id = await coursesService.createCourse(course);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating course',
    });
  }
  return res.status(201).json({
    id,
  });
};

coursesController.deleteCourse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const course = await coursesService.getCourseById(id);
  if (!course) {
    return res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
  const success = await coursesService.deleteCourse(id);
  if (!success) {
    res.status(500).json({
      error: 'Something went wrong while deleting course',
    });
  }
  return res.status(204).end();
};

coursesController.updateCourse = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { courseName } = req.body;
  if (!courseName) {
    return res.status(400).json({
      error: 'No coursename provided',
    });
  }
  const category = await coursesService.getCourseById(id);
  if (!category) {
    return res.status(400).json({
      error: `No course found with id: ${id}`,
    });
  }
  const courseToUpdate = {
    id,
    courseName,
  };
  const success = await coursesService.updateCourse(courseToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating coursename',
    });
  }
  return res.status(200).json({
    success: true,
  });
};

module.exports = coursesController;
