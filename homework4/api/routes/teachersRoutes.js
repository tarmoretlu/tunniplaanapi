const express = require('express');
const { teachersController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

/**
 * Users API endpoints
 */
router
.use(isLoggedIn)
.get('/', isAdmin, teachersController.getTeachers)
.get('/:id', isAdmin, teachersController.getTeacherById)
.post('/', isAdmin, teachersController.createTeacher)
.patch('/:id', isAdmin, teachersController.updateTeacher)
.delete('/:id', isAdmin, teachersController.deleteTeacher);

module.exports = router;
