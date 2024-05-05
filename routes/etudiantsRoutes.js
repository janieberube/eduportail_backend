// etudiantsRoutes.js
// API route

const express = require('express');
const router = express.Router();
const etudiantsController = require('../controllers/etudiantsController');

// Define routes
router.get('/etudiants', etudiantsController.getTousLesEtudiants);
router.get('/etudiants/:matricule', etudiantsController.getEtudiantParMatricule);

module.exports = router;
