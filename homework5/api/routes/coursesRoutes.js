const express = require('express');
const { coursesController } = require('../controllers');
const { isLoggedIn, isAdmin } = require('../middlewares');

const router = express.Router();

/**
 * Users API endpoints
 */
router
.use(isLoggedIn)
.get('/', isAdmin, coursesController.getCourses)
.get('/:id', isAdmin, coursesController.getCourseById)
.post('/', isAdmin, coursesController.createCourse)
.patch('/:id', isAdmin, coursesController.updateCourse)
.delete('/:id', isAdmin, coursesController.deleteCourse);

module.exports = router;
