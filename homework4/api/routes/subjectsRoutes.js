const express = require('express');
const { subjectsController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

/**
 * Users API endpoints
 */
router
.use(isLoggedIn)
.get('/', isAdmin, subjectsController.getSubjects)
.get('/:id', isAdmin, subjectsController.getSubjectById)
.post('/', isAdmin, subjectsController.createSubject)
.patch('/:id', isAdmin, subjectsController.updateSubject)
.delete('/:id', isAdmin, subjectsController.deleteSubject);

module.exports = router;
