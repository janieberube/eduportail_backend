// Fichier:             evaluationsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux évaluations

/*
Contrôleur :            Responsable de la gestion des demandes HTTP entrantes, du traitement des données et du renvoi des réponses HTTP appropriées.

                        Il contient généralement des méthodes qui définissent le comportement de l'application et la logique métier. 
                        Il peut inclure des méthodes pour créer, récupérer, mettre à jour et supprimer des étudiants, ainsi que toute autre opération liée aux étudiants.
*/

// Importation du module de configuration de la base de données distante
const pool = require('../config/database'); 


// Importation des fonctions du modèle
const coursModel = require('../models/evaluationsModel');


// Méthode du contrôleur pour récupérer les évaluations pour un matricule spécifique
exports.getEvaluationsParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT evaluations_etudiants.datePublication, evaluations_etudiants.notePointage, evaluations_etudiants.notePourcentage,
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


// Après l'exécution de 'pool.query', la connexion est renvoyée au pool pour être réutilisée (voir fichier database.js)


