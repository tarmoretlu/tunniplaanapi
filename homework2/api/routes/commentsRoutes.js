const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', commentsController.getComments);
router.get('/:id', commentsController.getCommentById);
router.post('/', commentsController.createComment);
router.patch('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
