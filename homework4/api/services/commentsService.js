const db = require('../../db');
const commentsService = {};

// Returns list of comments
commentsService.getComments = async () => {
  const comments = await db.query(
    `SELECT
      C.id, C.commentContent
    FROM
    comments C
    WHERE
    C.deleted = 0`,
  );
  return comments;
};

// Find comment by id. Returns comment if found or false.
commentsService.getCommentById = async (id) => {
  const comment = await db.query(
    `SELECT
    C.id, C.commentContent
  FROM
  comments C
  WHERE
  C.id = ? AND C.deleted = 0`, [id],
  );
  if (!comment) return false;
  return comment; 
};

// Creates new comment, returns id on new comment
commentsService.createComment = async (newComment) => {
  const result = await db.query('INSERT INTO comments SET ?', [newComment]);
  return result.insertId;
};

// Deletes comment
commentsService.deleteComment = async (id) => {
  await db.query('UPDATE comments SET deleted = 1 WHERE id = ?', [id]);
  return true;
};

// Updates comment
commentsService.updateComment = async (comment) => {
  await db.query('UPDATE comments SET commentContent = ? WHERE id = ?', [comment.commentContent, comment.id]);
  return true;
};

module.exports = commentsService;
