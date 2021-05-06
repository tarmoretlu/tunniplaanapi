const db = require('../../db');
const teachersService = {};

// Returns list of teachers
teachersService.getTeachers = async () => {
  const teachers = await db.query(
    `SELECT
      T.id, T.teacherName
    FROM
    teachers T
    WHERE
    T.deleted = 0`,
  );
  return teachers;
};

// Find teacher by id. Returns teacher if found or false.
teachersService.getTeacherById = async (id) => {
  const teacher = await db.query(
    `SELECT
    T.id, T.teacherName
  FROM
  teachers T
  WHERE
  T.id = ? AND T.deleted = 0`, [id],
  );
  if (!teacher) return false;
  return teacher;
};

// Creates new teacher, returns id on new teacher
teachersService.createTeacher = async (newTeacher) => {
  const check = await db.query('SELECT id FROM teachers WHERE teacherName = ?', [newTeacher.teacherName]);
    if (check != 0){
  
      return check[0].id;

    } else {  
      const result = await db.query('INSERT INTO teachers SET ?', [newTeacher]);
      return result.insertId;
    }
};

// Deletes teacher
teachersService.deleteTeacher = async (id) => {
  await db.query('UPDATE teachers SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates teacher
teachersService.updateTeacher = async (teacher) => {
  await db.query('UPDATE teachers SET teacherName = ? WHERE id = ?', [teacher.teacherName, teacher.id]);
  return true;
};

module.exports = teachersService;
