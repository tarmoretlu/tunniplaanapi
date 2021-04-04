const db = require('../../db');
const subjectsService = {};

// Returns list of subjects
subjectsService.getSubjects = async () => {
  const subjects = await db.query(
    `SELECT
      S.id, S.subjectCode, S.subjectName, S.subjectVolume, T.teacherName
    FROM
    subjects S
    INNER JOIN
      teachers T ON S.teachers_id = T.id
    WHERE
    S.deleted = 0`,
  );
  return subjects;
};

// Find subject by id. Returns subject if found or false.
subjectsService.getSubjectById = async (id) => {
  const subject = await db.query(
    `SELECT
    S.id, S.subjectCode, S.subjectName, S.subjectVolume, T.teacherName
  FROM
  subjects S
  INNER JOIN
    teachers T ON S.teachers_id = T.id
  WHERE
  S.id = ? AND S.deleted = 0`, [id],
  );
  if (!subject) return false;
  return subject;
};

// Creates new subject, returns id on new subject
subjectsService.createSubject = async (newSubject) => {
  const check = await db.query('SELECT id FROM subjects WHERE subjectCode = ?', [newSubject.subjectCode]);
    if (check != 0){
  
      return check[0].id;

    } else {  
      const result = await db.query('INSERT INTO subjects SET ?', [newSubject]);
      return result.insertId;
    }
  
};
// Deletes subject
subjectsService.deleteSubject = async (id) => {
  await db.query('UPDATE subjects SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates subject
subjectsService.updateSubject = async (subject) => {
  const subjectToUpdate = {};
  if (subject.subjectCode) {
    subjectToUpdate.subjectCode = subject.subjectCode;
  }
  if (subject.subjectName) {
    subjectToUpdate.subjectName = subject.subjectName;
  }
  if (subject.subjectVolume) {
    subjectToUpdate.subjectVolume = subject.subjectVolume;
  }
  if (subject.teachers_id) {
    subjectToUpdate.teachers_id = subject.teachers_id;
  }
  await db.query('UPDATE subjects SET ? WHERE id = ?', [subjectToUpdate, subject.id]);
  return true;
  
};

module.exports = subjectsService;
