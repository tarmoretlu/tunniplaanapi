const database = require('../../database');

const commentsService = {};

// Returns list of comments
commentsService.getComments = () => {
  const { comments } = database;
  return comments;
};

// Find comment by id. Returns comment if found or false.
commentsService.getCommentById = (id) => {
  const comment = database.comments.find((element) => element.id === id);
  if (comment) {
    return comment;
  }
  return false;
};

// Creates new comment, returns id on new comment
commentsService.createComment = (newComment) => {
  const id = database.comments.length + 1;
  const comment = {
    id,
    ...newComment,
  };
  database.comments.push(comment);
  return id;
};

// Deletes comment
commentsService.deleteComment = (id) => {
  // Find comment index
  const index = database.comments.findIndex((element) => element.id === id);
  // Remove comment from 'database'
  database.comments.splice(index, 1);
  return true;
};

// Updates comment
commentsService.updateComment = (comment) => {
  const index = database.comments.findIndex((element) => element.id === comment.id);
  if (comment.commentContent) {
    database.comments[index].commentContent = comment.commentContent;
  }
  
  return true;
};

module.exports = commentsService;
