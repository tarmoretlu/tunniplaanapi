
const { expect } = require('chai');
const { commentsService } = require('../api/services');
/*
let users;
*/

const newComment = {
    commentContent: 'test_uus',
 
};

const newCommentUpdated = {
    commentContent: 'test_uuendatud',
  
};

let idToBeUpdated;

describe('Comments service', function () {
  describe('Get Comments', function () {
    it('should return array of comments', async function () {
      comments = await commentsService.getComments();
      expect(comments).to.be.a('array');
    });
    it('should contain at least 1 comment', async function () {
      expect(comments.length).to.be.gt(1);
    });
  });


  describe('GetComment by ID', function () {
    it('should return comment array', async function () {
      const comment = await commentsService.getCommentById(2);
      expect(comment).to.be.a('array');
    });
    it('should return false if ID not existing', async function () {
      const comment = await commentsService.getCommentById(99999);
      expect(comment).to.be.empty;
    });
  });



  describe('Create comment', function () {
    it('should return the last inserted ID', async function () {
      const comment = await commentsService.createComment(newComment);
      expect(comment).to.be.a('number');
      idToBeUpdated = comment;
    });

  });

  describe('Update comment', function () {
    it('should return true if update successful', async function () {
      newCommentUpdated.id = idToBeUpdated;
      const comment = await commentsService.updateComment(newCommentUpdated);
      expect(comment).to.be.true;
    });
  });

  describe('Delete comment', function () {
    it('should return true if deleted', async function () {
      const comment = await commentsService.deleteComment(idToBeUpdated);
      expect(comment).to.be.true;
    });
  });

});
