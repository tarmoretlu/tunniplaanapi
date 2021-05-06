const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newRoom = {
  roomNumber: 'Test_controller',
  
};

const newRoomUpdated = {
    roomNumber: 'Test_controller_updated',
};

let newRoomId;
let adminToken;

describe('Rooms controller', function () {
  describe('GET /rooms unauthorized', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/rooms');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
    it('responds with rooms if logged in and respond in json and statusCode 200', async function () {
         //login:
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        //get rooms:
        const response = await request(app).get('/rooms').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /rooms/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/rooms/2`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /rooms/ new room', function () {
  it('responds status code 201 and ID of the new room', async function () {
    const response = await request(app).post(`/rooms/`).set('Authorization', `Bearer ${adminToken}`).send(newRoom);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newRoomId = response.body.id;
   
  });
});


describe('Update /rooms', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/rooms/${newRoomId}`).set('Authorization', `Bearer ${adminToken}`).send(newRoomUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /rooms', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/rooms/${newRoomId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
