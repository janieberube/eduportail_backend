// coursRoutes.js
// API route

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Define routes
router.get('/courses', coursController.getTousLesCours);
router.get('/courses/:id', coursController.getCoursParId);
// Add more routes as needed

module.exports = router;
