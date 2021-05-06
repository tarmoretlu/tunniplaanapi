const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newTimeslot = {
    startTime: '14:16', 
    endTime: '14:17', 
    
  
};

const newTimeslotUpdated = {
    startTime: '14:18', 
    endTime: '14:19', 
};

let newTimeslotId;
let adminToken;

describe('Timeslots controller', function () {
  describe('GET /timeslots unauthorized', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/timeslots');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
    it('responds with timeslots if logged in and respond in json and statusCode 200', async function () {
         //login:
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        //get timeslots:
        const response = await request(app).get('/timeslots').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /timeslots/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/timeslots/2`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /timeslots/ new timeslot', function () {
  it('responds status code 201 and ID of the new timeslot', async function () {
    const response = await request(app).post(`/timeslots/`).set('Authorization', `Bearer ${adminToken}`).send(newTimeslot);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newTimeslotId = response.body.id;
   
  });
});


describe('Update /timeslots', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/timeslots/${newTimeslotId}`).set('Authorization', `Bearer ${adminToken}`).send(newTimeslotUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /timeslots', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/timeslots/${newTimeslotId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
