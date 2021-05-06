const { subjectsService } = require('../services');
const subjectsController = {};

subjectsController.getSubjects = async (req, res) => {
  const subjects = await subjectsService.getSubjects();
  res.status(200).json({
    subjects,
  });
};

subjectsController.getSubjectById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subject = await subjectsService.getSubjectById(id);
  if (subject) {
    res.status(200).json({
      subject,
    });
  } else {
    res.status(400).json({
      error: `No subject found with id: ${id}`,
    });
  }
};

subjectsController.createSubject = async (req, res) => {
  const { subjectCode, subjectName, subjectVolume, teacherName } = req.body;
 
  if (!subjectCode || !subjectName || !subjectVolume || !teacherName) {
    return res.status(400).json({
      error: 'One or more parameters are missing',
    });
  }
  const subject = {
    subjectCode,
    subjectName,
    subjectVolume,
    teacherName,
  };
  const id = await subjectsService.createSubject(subject);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating subject',
    });
  }
  return res.status(201).json({
    id,
  });
};

subjectsController.deleteSubject = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subject = await subjectsService.getSubjectById(id);
  if (subject) {
    const success = await subjectsService.deleteSubject(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting subject',
      });
    }
  } else {
    res.status(400).json({
      error: `No subject found with id: ${id}`,
    });
  }
};

subjectsController.updateSubject = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { subjectCode, subjectName, subjectVolume, teacherName } = req.body;
  if (id && (subjectCode || subjectName || subjectVolume || teacherName)) {
    const subject = await subjectsService.getSubjectById(id);
    if (subject) {
      const subjectToUpdate = {
        id,
        subjectCode,
        subjectName,
        subjectVolume,
        teacherName,
      };
      const success = await subjectsService.updateSubject(subjectToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating subject',
        });
      }
    } else {
      res.status(400).json({
        error: `No subject found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Subject parameters missing',
    });
  }
};

module.exports = subjectsController;
