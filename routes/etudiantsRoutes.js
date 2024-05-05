// etudiantsRoutes.js
// API route

const express = require('express');
const router = express.Router();
const userController = require('../controllers/etudiantsController');

// Define routes
router.get('/etudiants', etudiantsController.getTousLesEtudiant);
router.get('/etudiants/:matricule', etudiantsController.getEtudiantParMatricule);

module.exports = router;
