const { commentsService } = require('../services');
const commentsController = {};

commentsController.getComments = async (req, res) => {
  const comments = await commentsService.getComments();
  res.status(200).json({
    comments,
  });
};

commentsController.getCommentById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const comment = await commentsService.getCommentById(id);
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

commentsController.createComment = async (req, res) => {
  const { commentContent } = req.body;
  if (!commentContent) {
    return res.status(400).json({
      error: 'Content of the comment is missing',
    });
  }
  const comment = {
    commentContent
    
  };
  const id = await commentsService.createComment(comment);
  if (!id) {
    return res.status(500).json({
      error: 'Something went wrong while creating comment',
    });
  }
  return res.status(201).json({
    id,
  });
};

commentsController.deleteComment = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // Check if user exists
  const comment = await commentsService.getCommentById(id);
  if (comment) {
    const success = await commentsService.deleteComment(id);
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

commentsController.updateComment = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { commentContent } = req.body;
  if (id && commentContent) {
    const comment = await commentsService.getCommentById(id);
    if (comment) {
      const commentToUpdate = {
        id,
        commentContent,
      };
      const success = await commentsService.updateComment(commentToUpdate);
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
