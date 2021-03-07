const express = require('express');
const teachersController = require('../controllers/teachersController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
/**
 * Users API endpoints
 */
router.get('/', isLoggedIn, isAdmin, teachersController.getTeachers);
router.get('/:id', isLoggedIn, isAdmin, teachersController.getTeacherById);
router.post('/', isLoggedIn, isAdmin, teachersController.createTeacher);
router.patch('/:id', isLoggedIn, isAdmin, teachersController.updateTeacher);
router.delete('/:id', isLoggedIn, isAdmin, teachersController.deleteTeacher);

module.exports = router;
