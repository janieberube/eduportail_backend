// Fichier:             programmesRoutes.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Description:         Module de route pour une API RESTful dans l'application Node.js avec le framework Express
// Bût:                 Définir les routes disponibles pour accéder aux fonctionnalités liées aux programmes  


// Importation des modules
const express = require('express');
const router = express.Router();
const programmesController = require('../controllers/programmesController');

// Définition des routes, association aux méthodes correspondantes des controlleurs
router.get('/programmes/:matricule', programmesController.getProgrammeParMatricule);


// Exportation du router pour pouvoir être utilisé ailleurs dans l'application
module.exports = router;
