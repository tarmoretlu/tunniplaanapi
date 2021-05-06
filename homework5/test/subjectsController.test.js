const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newSubject = {
    subjectCode: 'HK.test', 
    subjectName: 'Test_Aine', 
    subjectVolume: 5, 
    teacherName: 'Test Õpetaja',
  
};

const newSubjectUpdated = {
    subjectName: 'Test_aine_uuendatud',
};

let newSubjectId;
let adminToken;

describe('Subjects controller', function () {
  describe('GET /subjects unauthorized', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/subjects');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
    it('responds with subjects if logged in and respond in json and statusCode 200', async function () {
         //login:
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        //get subjects:
        const response = await request(app).get('/subjects').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /subjects/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/subjects/2`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /subjects/ new subject', function () {
  it('responds status code 201 and ID of the new subject', async function () {
    const response = await request(app).post(`/subjects/`).set('Authorization', `Bearer ${adminToken}`).send(newSubject);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newSubjectId = response.body.id;
   
  });
});


describe('Update /subjects', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/subjects/${newSubjectId}`).set('Authorization', `Bearer ${adminToken}`).send(newSubjectUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /subjects', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/subjects/${newSubjectId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
