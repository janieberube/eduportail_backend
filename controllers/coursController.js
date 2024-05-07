// Fichier:             coursController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux cours


// Importation du module de configuration de la base de données 
const pool = require('../config/database'); 


// Importation des fonctions du modèle
const coursModel = require('../models/coursModel');


// Méthode du contrôleur pour récupérer les cours pour un matricule spécifique
exports.getCoursParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT sigle, titreCours
                FROM inscriptions
                INNER JOIN cours_livres ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                INNER JOIN cours ON cours_livres.Cours_sigle = cours.sigle
                WHERE etudiant_matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des cours:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des cours: ' + error.message });
            return;
        }
        res.status(200).json(results);
    });
};

