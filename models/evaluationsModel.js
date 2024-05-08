// Fichier:             evaluationsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les évaluations


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer les évaluations par le matricule étudiant
module.exports.getEvaluationsParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
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
                console.error('Erreur lors de la récupération des évaluations pour l\'étudiant:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};






