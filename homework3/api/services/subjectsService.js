const database = require('../../database');

const subjectsService = {};

// Returns list of subjects
subjectsService.getSubjects = () => {
  const { subjects } = database;
  return subjects;
};

// Find subject by id. Returns subject if found or false.
subjectsService.getSubjectById = (id) => {
  const subject = database.subjects.find((element) => element.id === id);
  if (subject) {
    return subject;
  }
  return false;
};

// Creates new subject, returns id on new subject
subjectsService.createSubject = (newSubject) => {
  const id = database.subjects.length + 1;
  const subject = {
    id,
    ...newSubject,
  };
  database.subjects.push(subject);
  return id;
};

// Deletes subject
subjectsService.deleteSubject = (id) => {
  // Find subject index
  const index = database.subjects.findIndex((element) => element.id === id);
  // Remove subject from 'database'
  database.subjects.splice(index, 1);
  return true;
};

// Updates subject
subjectsService.updateSubject = (subject) => {
  const index = database.subjects.findIndex((element) => element.id === subject.id);
  if (subject.subjectCode) {
    database.subjects[index].subjectCode = subject.subjectCode;
  }
  if (subject.subjectName) {
    database.subjects[index].subjectName = subject.subjectName;
  }
  if (subject.subjectVolume) {
    database.subjects[index].subjectVolume = subject.subjectVolume;
  }
  return true;
};

module.exports = subjectsService;
