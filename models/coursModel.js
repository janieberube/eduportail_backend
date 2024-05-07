// Fichier:             coursModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les cours

/*
Modèle :                Gère les données et la logique métier de l'application. 

                        Il est responsable de définir comment les données sont structurées et manipulées
                        et inclut des fonctions pour interagir avec la bd pour effectuer 
                        des opérations CRUD (Create, Read, Update, Delete). 
*/

// Importation du module de configuration de la base de données distante
const pool = require('../config/database'); 


// Fonction pour récupérer tous les cours de la base de données
module.exports.getTousLesCours = (req, res) => {
    pool.query('SELECT sigle, titreCours FROM cours', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des cours:', error);
            reject(error);
            return;
        }
        resolve(results);
    });
};

/*
// Fonction pour récupérer un cours par le matricule étudiant
module.exports.getCoursParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT sigle, titreCours
                FROM inscriptions
                INNER JOIN cours_livres ON inscriptions.cours_livres_idcours_livre = cours_livres.idcours_livre
                INNER JOIN cours ON inscriptions.cours_sigle = cours.sigle
                WHERE etudiant_matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des cours pour l\'étudiant:', error);
            reject(error);
            return;
        }
        if (results.length === 0) {
            resolve(null);          // Cours introuvables
        }
        else {
            resolve(results[0]);    // Retourne les cours 
        }
    });
};
*/



