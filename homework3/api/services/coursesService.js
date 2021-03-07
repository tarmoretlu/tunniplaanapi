const database = require('../../database');

const coursesService = {};

// Returns list of courses
coursesService.getCourses = () => {
  const { courses } = database;
  return courses;
};

// Find course by id. Returns course if found or false.
coursesService.getCourseById = (id) => {
  const course = database.courses.find((element) => element.id === id);
  if (course) {
    return course;
  }
  return false;
};

// Creates new course, returns id on new course
coursesService.createCourse = (newCourse) => {
  const id = database.courses.length + 1;
  const course = {
    id,
    ...newCourse,
  };
  database.courses.push(course);
  return id;
};

// Deletes course
coursesService.deleteCourse = (id) => {
  // Find course index
  const index = database.courses.findIndex((element) => element.id === id);
  // Remove course from 'database'
  database.courses.splice(index, 1);
  return true;
};

// Updates course
coursesService.updateCourse = (course) => {
  const index = database.courses.findIndex((element) => element.id === course.id);
  if (course.courseName) {
    database.courses[index].courseName = course.courseName;
  }
  
  return true;
};

module.exports = coursesService;
