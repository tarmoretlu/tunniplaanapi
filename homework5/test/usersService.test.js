/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai');
const { usersService } = require('../api/services');

let users;

const newUser = {
  firstName: 'Tiina',
  lastName: 'Tina',
  email: 'tiina3@tiina.ee',
  password: 'tina',
  role: 'User',
};

const newUserUpdated = {
  firstName: 'Tinna',
  lastName: 'Tinnu',
};

let idToBeUpdated;

describe('Users service', function () {
  describe('GetUsers', function () {
    it('should return array of users', async function () {
      users = await usersService.getUsers();
      expect(users).to.be.a('array');
    });
    it('should contain at least 1 user', async function () {
      expect(users.length).to.be.gt(1);
    });
  });
  describe('GetUser by ID', function () {
    it('should return user object with keys', async function () {
      const user = await usersService.getUserById(2);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id', 'lastName', 'firstName', 'role', 'email']);
    });
    it('should return false if ID not existing', async function () {
      const user = await usersService.getUserById(9999);
      expect(user).to.be.false;
    });
  });

  describe('Create user', function () {
    it('should return the last inserted ID', async function () {
      const user = await usersService.createUser(newUser);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['id']);
      idToBeUpdated = user.id;
    });

    it('should return error if user email exists', async function () {
      const user = await usersService.createUser(newUser);
      expect(user).to.be.a('object');
      expect(user).to.have.keys(['error']);
    });
  });

  describe('Update user', function () {
    it('should return true if update successful', async function () {
      newUserUpdated.id = idToBeUpdated;
      const user = await usersService.updateUser(newUserUpdated);
      expect(user).to.be.true;
    });
  });

});
