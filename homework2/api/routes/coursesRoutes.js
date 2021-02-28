const express = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', coursesController.getCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.createCourse);
router.patch('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;
