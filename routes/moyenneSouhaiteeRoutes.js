// Fichier:             moyenneSouhaiteeRoutes.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Description:         Module de route pour une API RESTful dans l'application Node.js avec le framework Express
// Bût:                 Définir les routes disponibles pour accéder à la moyenne souhaitée  


// Importation des modules
const express = require('express');
const router = express.Router();
const moyenneSouhaiteeController = require('../controllers/moyenneSouhaiteeController');

// Définition des routes, association aux méthodes correspondantes des controlleurs
router.get('/moyenneSouhaitee/:matricule', moyenneSouhaiteeController.getMoyenneSouhaiteeParMatricule);
router.put('/moyenneSouhaitee/:matricule', moyenneSouhaiteeController.updateMoyenneSouhaitee);

// Exportation du router pour pouvoir être utilisé ailleurs dans l'application
module.exports = router;
