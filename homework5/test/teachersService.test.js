const { expect } = require('chai');
const { teachersService } = require('../api/services');


const newTeacher = {
    teacherName: 'Test_teacherService_uus',
 
};

const newTeacherUpdated = {
    teacherName: 'Test_teacherService_uuendatud',
  
};

let idToBeUpdated;

describe('Teachers service', function () {
  describe('Get Teachers', function () {
    it('should return array of teachers', async function () {
      teachers = await teachersService.getTeachers();
      expect(teachers).to.be.a('array');
    });
    it('should contain at least 1 teacher', async function () {
      expect(teachers.length).to.be.gt(1);
    });
  });


  describe('GetTeacher by ID', function () {
    it('should return teacher array', async function () {
      const teacher = await teachersService.getTeacherById(2);
      expect(teacher).to.be.a('array');
    });
    it('should return false if ID not existing', async function () {
      const teacher = await teachersService.getTeacherById(99999);
      expect(teacher).to.be.empty;
    });
  });



  describe('Create teacher', function () {
    it('should return the last inserted ID', async function () {
      const teacher = await teachersService.createTeacher(newTeacher);
      expect(teacher).to.be.a('number');
      idToBeUpdated = teacher;
    });

  });

  describe('Update teacher', function () {
    it('should return true if update successful', async function () {
      newTeacherUpdated.id = idToBeUpdated;
      const teacher = await teachersService.updateTeacher(newTeacherUpdated);
      expect(teacher).to.be.true;
    });
  });

  describe('Delete teacher', function () {
    it('should return true if deleted', async function () {
      const teacher = await teachersService.deleteTeacher(idToBeUpdated);
      expect(teacher).to.be.true;
    });
  });

});
