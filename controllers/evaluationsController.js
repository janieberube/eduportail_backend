// Fichier:             evaluationsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux évaluations


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Importation des fonctions du modèle
const coursModel = require('../models/evaluationsModel');


// Méthode du contrôleur pour récupérer les évaluations pour un matricule spécifique
exports.getEvaluationsParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT DATE(evaluations_etudiants.datePublication) AS datePublication, evaluations_etudiants.notePointage, evaluations_etudiants.notePourcentage, evaluations_etudiants.retroaction,
                evaluations.nomEvaluation, evaluations.ponderation, evaluations.pointage
                FROM evaluations_etudiants 
                INNER JOIN evaluations
                ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                INNER JOIN inscriptions
                ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                WHERE inscriptions.Etudiant_matricule = ?
                AND evaluations_etudiants.publier = '1'
                ORDER BY evaluations_etudiants.datePublication DESC`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des évaluations:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des évaluations: ' + error.message });
            return;
        }
        res.status(200).json(results);
    });
};

