const express = require('express');
const subjectsController = require('../controllers/subjectsController');

const router = express.Router();

/**
 * Users API endpoints
 */
router.get('/', subjectsController.getSubjects);
router.get('/:id', subjectsController.getSubjectById);
router.post('/', subjectsController.createSubject);
router.patch('/:id', subjectsController.updateSubject);
router.delete('/:id', subjectsController.deleteSubject);

module.exports = router;
