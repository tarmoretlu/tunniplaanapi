const subjectsService = require('../services/subjectsService');

const subjectsController = {};

subjectsController.getSubjects = (req, res) => {
  const subjects = subjectsService.getSubjects();
  res.status(200).json({
    subjects,
  });
};

subjectsController.getSubjectById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subject = subjectsService.getSubjectById(id);
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

subjectsController.createSubject = (req, res) => {
  const { subjectCode, subjectName, subjectVolume } = req.body;
  if (subjectCode && subjectName && subjectVolume) {
    const subject = {
      subjectCode,
      subjectName,
      subjectVolume
    };
    const id = subjectsService.createSubject(subject);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Subjects parameter is missing',
    });
  }
};

subjectsController.deleteSubject = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const subject = subjectsService.getSubjectById(id);
  if (subject) {
    const success = subjectsService.deleteSubject(id);
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

subjectsController.updateSubject = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { subjectCode, subjectName, subjectVolume } = req.body;
  if (id && subjectCode && subjectName && subjectVolume) {
    const subject = subjectsService.getSubjectById(id);
    if (subject) {
      const subjectToUpdate = {
        id,
        subjectCode,
        subjectName,
        subjectVolume,
      };
      const success = subjectsService.updateSubject(subjectToUpdate);
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
