const db = require('../../db');
const coursesService = {};
// Returns list of courses
coursesService.getCourses = async () => {
  const courses = await db.query(
    `SELECT
      C.id, C.courseName
    FROM
    courses C
    WHERE
    C.deleted = 0`,
  );
  return courses;
};

// Find course by id. Returns course if found or false.
coursesService.getCourseById = async (id) => {
  const course = await db.query(
    `SELECT
    C.id, C.courseName
  FROM
  courses C
  WHERE
  C.id = ? AND C.deleted = 0`, [id],
  );
  if (!course) return false;
  return course; 
};

// Creates new course, returns id on new course
coursesService.createCourse = async (newCourse) => {
  const check = await db.query('SELECT id FROM courses WHERE courseName = ?', [newCourse.courseName]);
    if (check != 0){
  
      return check[0].id;

    } else {  
      const result = await db.query('INSERT INTO courses SET ?', [newCourse]);
      return result.insertId;
    }
};

// Deletes course
coursesService.deleteCourse = async (id) => {
  await db.query('UPDATE courses SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates course
coursesService.updateCourse = async (course) => {
  await db.query('UPDATE courses SET courseName = ? WHERE id = ?', [course.courseName, course.id]);
  return true;
};

module.exports = coursesService;
