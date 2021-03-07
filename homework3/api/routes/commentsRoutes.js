const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
/**
 * Users API endpoints
 */
router.get('/', isLoggedIn, isAdmin, commentsController.getComments);
router.get('/:id', isLoggedIn, isAdmin, commentsController.getCommentById);
router.post('/', isLoggedIn, isAdmin, commentsController.createComment);
router.patch('/:id', isLoggedIn, isAdmin, commentsController.updateComment);
router.delete('/:id', isLoggedIn, isAdmin, commentsController.deleteComment);

module.exports = router;
