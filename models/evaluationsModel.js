// Fichier:             evaluationsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les évaluations


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer les évaluations pour un id d'inscription
module.exports.getEvaluationsParIdInscription = (idInscription) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT evaluations_etudiants.datePublication, evaluations_etudiants.notePointage, evaluations_etudiants.notePourcentage, evaluations_etudiants.retroaction, types_evaluations.idType_Evaluation, evaluations.nomEvaluation, evaluations.ponderation, evaluations.pointage, cours.sigle
                    FROM evaluations_etudiants 
                    INNER JOIN evaluations
                    ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                    INNER JOIN types_evaluations
                    ON types_evaluations.idType_Evaluation = evaluations.Types_Evaluations_idType_Evaluation
                    INNER JOIN inscriptions
                    ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                    INNER JOIN cours_livres
                    ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN cours
                    ON cours.sigle = cours_livres.Cours_sigle
                    INNER JOIN sessions
                    ON cours_livres.Sessions_sessionID = sessions.sessionID
                    WHERE inscriptions.idInscription = ?
                    AND evaluations_etudiants.publier = '1'
                    AND CURRENT_DATE() >= sessions.dateDebutSession 
                    AND CURRENT_DATE() <= sessions.dateFinSession
                    ORDER BY evaluations_etudiants.datePublication DESC`, [idInscription], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des évaluations:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

module.exports.getTousLesEvaluationsPourEtudiant = (matricule) => {
    return new Promise((resolve, reject) => { 
        pool.query(`SELECT evaluations_etudiants.datePublication, evaluations_etudiants.notePointage, evaluations_etudiants.notePourcentage, evaluations_etudiants.retroaction, types_evaluations.idType_Evaluation, evaluations.nomEvaluation, evaluations.ponderation, evaluations.pointage, cours.sigle
                    FROM evaluations_etudiants 
                    INNER JOIN evaluations
                    ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                    INNER JOIN types_evaluations
                    ON types_evaluations.idType_Evaluation = evaluations.Types_Evaluations_idType_Evaluation
                    INNER JOIN inscriptions
                    ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                    INNER JOIN cours_livres
                    ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN cours
                    ON cours.sigle = cours_livres.Cours_sigle
                    INNER JOIN sessions
                    ON cours_livres.Sessions_sessionID = sessions.sessionID
                    WHERE evaluations_etudiants.publier = '1'
                    AND CURRENT_DATE() >= sessions.dateDebutSession 
                    AND CURRENT_DATE() <= sessions.dateFinSession
                    ORDER BY evaluations_etudiants.datePublication DESC`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des évaluations:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

module.exports.getTousLesEvaluationsAvecRetro = (matricule) => {
    return new Promise((resolve, reject) => { 
        pool.query(`SELECT evaluations_etudiants.datePublication, evaluations_etudiants.notePointage, evaluations_etudiants.notePourcentage, evaluations_etudiants.retroaction, types_evaluations.idType_Evaluation, evaluations.nomEvaluation, evaluations.ponderation, evaluations.pointage, cours.sigle
                    FROM evaluations_etudiants 
                    INNER JOIN evaluations
                    ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                    INNER JOIN types_evaluations
                    ON types_evaluations.idType_Evaluation = evaluations.Types_Evaluations_idType_Evaluation
                    INNER JOIN inscriptions
                    ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                    INNER JOIN cours_livres
                    ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN cours
                    ON cours.sigle = cours_livres.Cours_sigle
                    INNER JOIN sessions
                    ON cours_livres.Sessions_sessionID = sessions.sessionID
                    WHERE evaluations_etudiants.publier = '1'
                    AND CURRENT_DATE() >= sessions.dateDebutSession 
                    AND CURRENT_DATE() <= sessions.dateFinSession
                    AND evaluations_etudiants.retroaction != "NULL"
                    ORDER BY evaluations_etudiants.datePublication DESC`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des évaluations avec rétros:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

module.exports.getCoursForce = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT cours.sigle, AVG(evaluations_etudiants.notePourcentage) AS averageGrade
                    FROM evaluations_etudiants 
                    INNER JOIN evaluations
                    ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                    INNER JOIN inscriptions
                    ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                    INNER JOIN cours_livres
                    ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN cours
                    ON cours.sigle = cours_livres.Cours_sigle
                    INNER JOIN sessions
                    ON cours_livres.Sessions_sessionID = sessions.sessionID
                    WHERE evaluations_etudiants.publier = '1'
                    AND CURRENT_DATE() >= sessions.dateDebutSession 
                    AND CURRENT_DATE() <= sessions.dateFinSession
                    GROUP BY cours.sigle
                    ORDER BY averageGrade DESC
                    LIMIT 1`, (error, results) => {
            if (error) {
                console.error('Error fetching class with highest average:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve({ error: 'No classes found' });
                return;
            }
            resolve(results[0]);
        });
    });
};

module.exports.getCoursFaiblesse = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT cours.sigle, AVG(evaluations_etudiants.notePourcentage) AS averageGrade
                    FROM evaluations_etudiants 
                    INNER JOIN evaluations
                    ON evaluations_etudiants.Evaluations_idEvaluation = evaluations.idEvaluation
                    INNER JOIN inscriptions
                    ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                    INNER JOIN cours_livres
                    ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN cours
                    ON cours.sigle = cours_livres.Cours_sigle
                    INNER JOIN sessions
                    ON cours_livres.Sessions_sessionID = sessions.sessionID
                    WHERE evaluations_etudiants.publier = '1'
                    AND CURRENT_DATE() >= sessions.dateDebutSession 
                    AND CURRENT_DATE() <= sessions.dateFinSession
                    GROUP BY cours.sigle
                    ORDER BY averageGrade ASC
                    LIMIT 1`, (error, results) => {
            if (error) {
                console.error('Error fetching class with lowest average:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve({ error: 'No classes found' });
                return;
            }
            resolve(results[0]);
        });
    });
};


