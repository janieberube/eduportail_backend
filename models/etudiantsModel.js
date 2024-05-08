// Fichier:             etudiantsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les étudiants

/*
Modèle :                Gère les données et la logique métier de l'application. 

                        Il est responsable de définir comment les données sont structurées et manipulées
                        et inclut des fonctions pour interagir avec la bd pour effectuer 
                        des opérations CRUD (Create, Read, Update, Delete). 
*/

// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer un étudiant par son matricule
exports.getEtudiantParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT prenom, nom, nomUtilisateur, matricule, courrielEtudiant, dateInscriptionProgramme 
                    FROM etudiants WHERE matricule = ?`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération de l\'étudiant:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve(null);          // Étudiant introuvable
            }
            else {
                resolve(results[0]);    // Retourne le premier étudiant trouvé
            }
        });
    });
};


