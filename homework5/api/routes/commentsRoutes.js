const express = require('express');
const { commentsController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');


const router = express.Router();

/**
 * Users API endpoints
 */
 router
 .use(isLoggedIn)
.get('/', isLoggedIn, isAdmin, commentsController.getComments)
.get('/:id', isLoggedIn, isAdmin, commentsController.getCommentById)
.post('/', isLoggedIn, isAdmin, commentsController.createComment)
.patch('/:id', isLoggedIn, isAdmin, commentsController.updateComment)
.delete('/:id', isLoggedIn, isAdmin, commentsController.deleteComment);

module.exports = router;
