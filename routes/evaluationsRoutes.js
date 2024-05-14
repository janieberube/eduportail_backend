// Fichier: evaluationsRoutes.js
// Programmeurs: Janie Bérubé, Clément Sonier, André Doucet
// Description: Module de route pour une API RESTful dans l'application Node.js avec le framework Express
// Bût: Définir les routes disponibles pour accéder aux fonctionnalités liées aux évaluations


// Importation des modules
const express = require('express');
const router = express.Router();
const evaluationsController = require('../controllers/evaluationsController');


// Définition des routes, association aux méthodes correspondantes des controlleurs
router.get('/evaluations/inscription/:idInscription', evaluationsController.getEvaluationsParIdInscription);
router.get('/evaluations/matricule/:matricule', evaluationsController.getTousLesEvaluationsPourEtudiant);
router.get('/evaluations/retroaction/:matricule', evaluationsController.getTousLesEvaluationsAvecRetro);
router.get('/evaluations/force', evaluationsController.getCoursForce);
router.get('/evaluations/faiblesse', evaluationsController.getCoursFaiblesse);

// Exportation du router pour pouvoir être utilisé ailleurs dans l'application
module.exports = router;
