const { teachersService } = require('../services');
const teachersController = {};


teachersController.getTeachers = async (req, res) => {
  const teachers = await teachersService.getTeachers();
  res.status(200).json({
    teachers,
  });
};


teachersController.getTeacherById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = await teachersService.getTeacherById(id);
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


teachersController.createTeacher = async (req, res) => {
  const { teacherName } = req.body;
 
  if (!teacherName) {
    return res.status(400).json({
      error: 'Name of the teacher is missing',
    });
  }
  const teacher = {
    teacherName,
  };
  const id = await teachersService.createTeacher(teacher);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating teacher',
    });
  }
  return res.status(201).json({
    id,
  }); 


};


teachersController.deleteTeacher = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const teacher = await teachersService.getTeacherById(id);
  if (!teacher) {
    return res.status(400).json({
      error: `No teacher found with id: ${id}`,
    });
  }
  const success = await teachersService.deleteTeacher(id);
  if (!success) {
    res.status(500).json({
      error: 'Something went wrong while deleting teacher',
    });
  }
  return res.status(204).end();
  
 
};


teachersController.updateTeacher = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { teacherName } = req.body;
  if (!teacherName) {
    return res.status(400).json({
      error: 'No name of the teacher provided',
    });
  }
  const category = await teachersService.getTeacherById(id);
  if (!category) {
    return res.status(400).json({
      error: `No teacher found with id: ${id}`,
    });
  }
  const teacherToUpdate = {
    id,
    teacherName,
  };
  const success = await teachersService.updateTeacher(teacherToUpdate);
  if (!success) {
    return res.status(500).json({
      error: 'Something went wrong while updating the name of the teacher',
    });
  }
  return res.status(200).json({
    success: true,
  });


};

module.exports = teachersController;
