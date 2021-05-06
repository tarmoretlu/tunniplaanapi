const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

const adminUser = {
  email: 'mati@maasikas.ee',
  password: 'mati',
};

const newComment = {
  commentContent: 'Test_controller',
  
};

const newCommentUpdated = {
    commentContent: 'Test_controller_updated',
};

let newCommentId;
let adminToken;

describe('Comments controller', function () {
  describe('GET /comments unauthorized', function () {
    it('responds with error message in json and statusCode 403', async function () {
      const response = await request(app).get('/comments');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.error).to.equal('No authorization header');
    });
    it('responds with comments if logged in and respond in json and statusCode 200', async function () {
         //login:
        const token = await request(app).post('/users/login').send(adminUser);
        adminToken = token.body.token;
        //get comments:
        const response = await request(app).get('/comments').set('Authorization', `Bearer ${adminToken}`);
        expect(response.body).to.be.a('object');
        expect(response.statusCode).to.equal(200);
      });
  });


describe('GET /comments/id', function () {
  it('responds status code 200', async function () {
    const response = await request(app).get(`/comments/2`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
   
  });
});

describe('POST /comments/ new comment', function () {
  it('responds status code 201 and ID of the new comment', async function () {
    const response = await request(app).post(`/comments/`).set('Authorization', `Bearer ${adminToken}`).send(newComment);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.be.a('object');
    newCommentId = response.body.id;
   
  });
});


describe('Update /comments', function () {
  it('responds status code 200 and success message in object', async function () {
    const response = await request(app).patch(`/comments/${newCommentId}`).set('Authorization', `Bearer ${adminToken}`).send(newCommentUpdated);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.a('object');
    
  });
});

describe('DELETE /comments', function () {
  it('responds with status code 204', async function () {
    const response = await request(app).delete(`/comments/${newCommentId}`).set('Authorization', `Bearer ${adminToken}`);
    expect(response.statusCode).to.equal(204);
  });
});

});
