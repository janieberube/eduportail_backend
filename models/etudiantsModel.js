// Fichier:             etudiantsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec la table des étudiants

/*
Modèle :                Gère les données et la logique métier de l'application. 

                        Il est responsable de définir comment les données sont structurées et manipulées
                        et inclut des fonctions pour interagir avec la bd pour effectuer 
                        des opérations CRUD (Create, Read, Update, Delete). 
*/

// Importation du module de configuration de la base de données distante
const pool = require('../config/database'); 


// Fonction pour récupérer tous les étudiants de la base de données
exports.getTousLesEtudiants = (resolve, reject) => {
    pool.query('SELECT prenom, nom, nomUtilisateur, matricule, courriel, dateInscriptionProgramme FROM etudiants', (error, results) => {
        if (error) {
            console.error('Error fetching etudiants:', error);
            reject(error);
            return;
        }
        resolve(results);
    });
};


// Fonction pour récupérer un étudiant par son matricule
exports.getEtudiantParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT prenom, nom, nomUtilisateur, matricule, courriel, dateInscriptionProgramme FROM etudiants WHERE id = ?', [matricule], (error, results) => {
            if (error) {
                console.error('Error fetching etudiant:', error);
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


