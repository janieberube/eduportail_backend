// Fichier:             coursController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux cours

/*
Contrôleur :            Responsable de la gestion des demandes HTTP entrantes, du traitement des données et du renvoi des réponses HTTP appropriées.

                        Il contient généralement des méthodes qui définissent le comportement de l'application et la logique métier. 
                        Il peut inclure des méthodes pour créer, récupérer, mettre à jour et supprimer des étudiants, ainsi que toute autre opération liée aux étudiants.
*/

// Importation du module de configuration de la base de données distante
const pool = require('../config/database'); 


// Importation des fonctions du modèle
const coursModel = require('../models/coursModel');


// Méthode contrôleur pour récupérer tous les cours
exports.getTousLesCours = (req, res) => {
    pool.query('SELECT sigle, titreCours FROM cours', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des cours:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des cours: ' + error.message });
            return;
        }
        res.status(200).json(results);
    });
};

// Méthode du contrôleur pour récupérer les cours pour un matricule spécifique
exports.getCoursParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT sigle, titreCours
                FROM inscriptions
                INNER JOIN cours_livres ON inscriptions.cours_livres_idcours_livre = cours_livres.idcours_livre
                INNER JOIN cours ON inscriptions.cours_sigle = cours.sigle
                WHERE etudiant_matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des cours:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des cours: ' + error.message });
            return;
        }
        res.status(200).json(results);
    });
};

// Après l'exécution de 'pool.query', la connexion est renvoyée au pool pour être réutilisée (voir fichier database.js)


