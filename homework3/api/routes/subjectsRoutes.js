const express = require('express');
const subjectsController = require('../controllers/subjectsController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
/**
 * Users API endpoints
 */
router.get('/', isLoggedIn, isAdmin, subjectsController.getSubjects);
router.get('/:id', isLoggedIn, isAdmin, subjectsController.getSubjectById);
router.post('/', isLoggedIn, isAdmin, subjectsController.createSubject);
router.patch('/:id', isLoggedIn, isAdmin, subjectsController.updateSubject);
router.delete('/:id', isLoggedIn, isAdmin, subjectsController.deleteSubject);

module.exports = router;
