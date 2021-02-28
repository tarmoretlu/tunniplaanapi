const commentsService = require('../services/commentsService');

const commentsController = {};

commentsController.getComments = (req, res) => {
  const comments = commentsService.getComments();
  res.status(200).json({
    comments,
  });
};

commentsController.getCommentById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const comment = commentsService.getCommentById(id);
  if (comment) {
    res.status(200).json({
      comment,
    });
  } else {
    res.status(400).json({
      error: `No comment found with id: ${id}`,
    });
  }
};

commentsController.createComment = (req, res) => {
  const { commentContent } = req.body;
  if (commentContent) {
    const comment = {
      commentContent
    };
    const id = commentsService.createComment(comment);
    res.status(201).json({
      id,
    });
  } else {
    res.status(400).json({
      error: 'Comments content is missing',
    });
  }
};

commentsController.deleteComment = (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if user exists
  const comment = commentsService.getCommentById(id);
  if (comment) {
    const success = commentsService.deleteComment(id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(500).json({
        error: 'Something went wrong while deleting comment',
      });
    }
  } else {
    res.status(400).json({
      error: `No comment found with id: ${id}`,
    });
  }
};

commentsController.updateComment = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { commentContent } = req.body;
  if (id && commentContent) {
    const comment = commentsService.getCommentById(id);
    if (comment) {
      const commentToUpdate = {
        id,
        commentContent,
      };
      const success = commentsService.updateComment(commentToUpdate);
      if (success) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          error: 'Something went wrong while updating comment',
        });
      }
    } else {
      res.status(400).json({
        error: `No comment found with id: ${id}`,
      });
    }
  } else {
    res.status(400).json({
      error: 'Id or comment content is missing',
    });
  }
};

module.exports = commentsController;
