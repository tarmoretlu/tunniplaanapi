const { expect } = require('chai');
const { coursesService } = require('../api/services');


const newCourse = {
    courseName: 'test_course_uus',
 
};

const newCourseUpdated = {
    courseName: 'test_course_uuendatud',
  
};

let idToBeUpdated;

describe('Courses service', function () {
  describe('Get Courses', function () {
    it('should return array of courses', async function () {
      courses = await coursesService.getCourses();
      expect(courses).to.be.a('array');
    });
    it('should contain at least 1 course', async function () {
      expect(courses.length).to.be.gt(1);
    });
  });


  describe('GetCourse by ID', function () {
    it('should return course array', async function () {
      const course = await coursesService.getCourseById(2);
      expect(course).to.be.a('array');
    });
    it('should return false if ID not existing', async function () {
      const course = await coursesService.getCourseById(99999);
      expect(course).to.be.empty;
    });
  });



  describe('Create course', function () {
    it('should return the last inserted ID', async function () {
      const course = await coursesService.createCourse(newCourse);
      expect(course).to.be.a('number');
      idToBeUpdated = course;
    });

  });

  describe('Update course', function () {
    it('should return true if update successful', async function () {
      newCourseUpdated.id = idToBeUpdated;
      const course = await coursesService.updateCourse(newCourseUpdated);
      expect(course).to.be.true;
    });
  });

  describe('Delete course', function () {
    it('should return true if deleted', async function () {
      const course = await coursesService.deleteCourse(idToBeUpdated);
      expect(course).to.be.true;
    });
  });

});
