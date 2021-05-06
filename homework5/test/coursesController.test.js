const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newCourse = {
  courseName: 'Test_courseController',
  
};

const newCourseUpdated = {
    courseName: 'Test_courseController_updated',
};

let newCourseId;
let adminToken;

describe('Courses controller', function () {
  describe('GET /courses unauthorized', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/courses');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
    it('responds with courses if logged in and respond in json and statusCode 200', async function () {
         //login:
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        //get courses:
        const response = await request(app).get('/courses').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /courses/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/courses/2`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /courses/ new course', function () {
  it('responds status code 201 and ID of the new course', async function () {
    const response = await request(app).post(`/courses/`).set('Authorization', `Bearer ${adminToken}`).send(newCourse);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newCourseId = response.body.id;
   
  });
});


describe('Update /courses', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/courses/${newCourseId}`).set('Authorization', `Bearer ${adminToken}`).send(newCourseUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /courses', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/courses/${newCourseId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
