const teachersService = require('../services/teachersService');

const teachersController = {};

/**
 * Get all users
 * GET - /users
 * Required values: none
 * Optional values: none
 * Success: status 200 - OK and list of users
 */
teachersController.getTeachers = (req, res) => {
  const teachers = teachersService.getTeachers();
  res.status(200).json({
    teachers,
  });
};

/**
 * Get user by user id
 * GET - /users/:id
 * Required values: id
 * Optional values: none
 * Success: status 200 - OK and user with specified id
 * Error: status 400 - Bad Request and error message
 */
teachersController.getTeacherById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = teachersService.getTeacherById(id);
  if (teacher) {
    res.status(200).json({
      teacher,
    });
  } else {
    res.status(400).json({
      error: `No teacher found with id: ${id}`,
    });
  }
};

/**
 * Create new user
 * POST - /users
 * Required values: firstName, lastName
 * Optional values: none
 * Success: status 201 - Created and id of created user
 * Error: status 400 - Bad Request and error message
 */
teachersController.createTeacher = (req, res) => {
  const { teacherName } = req.body;
  if (teacherName) {
    const teacher = {
      teacherName
    };
    const id = teachersService.createTeacher(teacher);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Teachers name is missing',
    });
  }
};

/**
 * Delete user
 * DELETE - /users/:id
 * Required values: id
 * Optional values: none
 * Success: status 204 - No Content
 * Error: status 400 - Bad Request and error message
 */
teachersController.deleteTeacher = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if user exists
  const teacher = teachersService.getTeacherById(id);
  if (teacher) {
    const success = teachersService.deleteTeacher(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting teacher',
      });
    }
  } else {
    res.status(400).json({
      error: `No teacher found with id: ${id}`,
    });
  }
};

/**
 * Update user
 * PATCH - /users/:id
 * Required values: id, firstName OR lastName
 * Optional values: firstName, lastName
 * Success: status 200 - OK and success message
 * Error: status 400 - Bad Request and error message
 */
teachersController.updateTeacher = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { teacherName } = req.body;
  if (id && teacherName) {
    const teacher = teachersService.getTeacherById(id);
    if (teacher) {
      const teacherToUpdate = {
        id,
        teacherName,
      };
      const success = teachersService.updateTeacher(teacherToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating teacher',
        });
      }
    } else {
      res.status(400).json({
        error: `No teacher found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id or teacher name is missing',
    });
  }
};

module.exports = teachersController;
