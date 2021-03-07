const express = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
/**
 * Users API endpoints
 */
router.get('/', isLoggedIn, isAdmin, coursesController.getCourses);
router.get('/:id', isLoggedIn, isAdmin, coursesController.getCourseById);
router.post('/', isLoggedIn, isAdmin, coursesController.createCourse);
router.patch('/:id', isLoggedIn, isAdmin, coursesController.updateCourse);
router.delete('/:id', isLoggedIn, isAdmin, coursesController.deleteCourse);

module.exports = router;
