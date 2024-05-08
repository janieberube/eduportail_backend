// Fichier:             etudiantsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux utilisateurs pour les étudiants

/*
Contrôleur :            Le contrôleur est responsable de la gestion des demandes HTTP entrantes, du traitement des données et du renvoi des réponses HTTP appropriées.
                        Il contient généralement des méthodes qui définissent le comportement de l'application et la logique métier. 
                        Il peut inclure des méthodes pour créer, récupérer, mettre à jour et supprimer des étudiants, ainsi que toute autre opération liée aux étudiants.
*/


// Importation du module de configuration de la base de données 
const pool = require('../config/database'); 


// Méthode du contrôleur pour récupérer un étudiant par son matricule
exports.getEtudiantParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT prenom, nom, nomUtilisateur, matricule, courrielEtudiant, dateInscriptionProgramme 
                FROM etudiants WHERE matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des étudiants:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des étudiants: ' + error.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Étudiant introuvable' });
            return;
        }
        res.status(200).json(results[0]);
    });
};

// Après l'exécution de 'pool.query', La connexion est renvoyée au pool pour être réutilisée (voir fichier database.js)

