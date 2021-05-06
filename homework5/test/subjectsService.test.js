const { expect } = require('chai');
const { subjectsService } = require('../api/services');


const newSubject = {
    subjectCode: 'HK.test', 
    subjectName: 'Test_Aine', 
    subjectVolume: 5, 
    teacherName: 'Test Õpetaja',
  
};

const newSubjectUpdated = {
    subjectName: 'Test_aine_uuendatud',
};

let idToBeUpdated;

describe('Subjects service', function () {
  describe('Get Subjects', function () {
    it('should return array of subjects', async function () {
      subjects = await subjectsService.getSubjects();
      expect(subjects).to.be.a('array');
    });
    it('should contain at least 1 subject', async function () {
      expect(subjects.length).to.be.gt(1);
    });
  });


  describe('GetSubject by ID', function () {
    it('should return subject array', async function () {
      const subject = await subjectsService.getSubjectById(2);
      expect(subject).to.be.a('array');
    });
    it('should return false if ID not existing', async function () {
      const subject = await subjectsService.getSubjectById(99999);
      expect(subject).to.be.empty;
    });
  });



  describe('Create subject', function () {
    it('should return the last inserted ID', async function () {
      const subject = await subjectsService.createSubject(newSubject);
      expect(subject).to.be.a('number');
      idToBeUpdated = subject;
    });

  });

  describe('Update subject', function () {
    it('should return true if update successful', async function () {
      newSubjectUpdated.id = idToBeUpdated;
      const subject = await subjectsService.updateSubject(newSubjectUpdated);
      expect(subject).to.be.true;
    });
  });

  describe('Delete subject', function () {
    it('should return true if deleted', async function () {
      const subject = await subjectsService.deleteSubject(idToBeUpdated);
      expect(subject).to.be.true;
    });
  });

});
