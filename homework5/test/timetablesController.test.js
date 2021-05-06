const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newTimetable = {
    date: '06.05.2021', 
    startTime: '11:05', 
    endTime: '11.06', 
    subjectCode: 'HKHK100.HK', 
    courseName: 'uus_test', 
    roomNumber: 'test_room', 
    commentContent: 'test_comment',
  
};

const newTimetableUpdated = {
    date: '06.05.2022', 
    startTime: '11:07', 
    endTime: '11.08', 
    subjectCode: 'HKHK101.HK', 
    courseName: 'uus_test_kursus', 
    roomNumber: 'test_room_uu', 
    commentContent: 'test_comment_uu',
};

let newTimetableId;
let adminToken;

describe('Timetables controller', function () {
  describe('GET /timetables', function () {
    it('responds in json and statusCode 200', async function () {
        const response = await request(app).get('/timetables');
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /timetables/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/timetables/2`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /timetables/ new timetable', function () {
  it('responds status code 201 and ID of the new timetable', async function () {
      //login:
    const token = await request(app).post('/users/login').send(adminUser);
    adminToken = token.body.token;
    const response = await request(app).post(`/timetables/`).set('Authorization', `Bearer ${adminToken}`).send(newTimetable);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newTimetableId = response.body.id;
   
  });
});

describe('Update /timetables', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/timetables/${newTimetableId}`).set('Authorization', `Bearer ${adminToken}`).send(newTimetableUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /timetables', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/timetables/${newTimetableId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
