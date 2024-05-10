// Fichier:             evaluationsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux évaluations


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Importation des fonctions du modèle
const evaluationsModel = require('../models/evaluationsModel');


// Méthode du contrôleur pour récupérer les évaluations pour un id d'inscription
exports.getEvaluationsParIdInscription = (req, res) => {
    const idInscription = req.params.idInscription;
    pool.query(`SELECT evaluations_etudiants.datePublication, evaluations_etudiants.notePointage, evaluations_etudiants.notePourcentage, evaluations_etudiants.retroaction,
                evaluations.nomEvaluation, evaluations.ponderation, evaluations.pointage
                FROM evaluations_etudiants 
                INNER JOIN evaluations
                ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                INNER JOIN inscriptions
                ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                INNER JOIN cours_livres
                ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                INNER JOIN sessions
                ON cours_livres.Sessions_sessionID = sessions.sessionID
                WHERE inscriptions.idInscription = ?
                AND evaluations_etudiants.publier = '1'
                AND CURRENT_DATE() >= sessions.dateDebutSession 
                AND CURRENT_DATE() <= sessions.dateFinSession
                ORDER BY evaluations_etudiants.datePublication DESC`, [idInscription], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des évaluations:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des évaluations: ' + error.message });
            return;
        }
        res.status(200).json(results);
    });
};

