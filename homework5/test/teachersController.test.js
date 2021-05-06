const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newTeacher = {
  teacherName: 'Test_teacherController',
  
};

const newTeacherUpdated = {
    teacherName: 'Test_teacherController_updated',
};

let newTeacherId;
let adminToken;

describe('Teachers controller', function () {
  describe('GET /teachers unauthorized', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/teachers');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
    it('responds with teachers if logged in and respond in json and statusCode 200', async function () {
         //login:
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        //get teachers:
        const response = await request(app).get('/teachers').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /teachers/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/teachers/2`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /teachers/ new teacher', function () {
  it('responds status code 201 and ID of the new teacher', async function () {
    const response = await request(app).post(`/teachers/`).set('Authorization', `Bearer ${adminToken}`).send(newTeacher);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newTeacherId = response.body.id;
   
  });
});


describe('Update /teachers', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/teachers/${newTeacherId}`).set('Authorization', `Bearer ${adminToken}`).send(newTeacherUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /teachers', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/teachers/${newTeacherId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
