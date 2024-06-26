// Fichier:             coursModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les cours


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer un cours par le matricule étudiant
module.exports.getCoursParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT inscriptions.idInscription, cours.sigle, cours.titreCours
                    FROM inscriptions
                    INNER JOIN cours_livres ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN cours ON cours_livres.Cours_sigle = cours.sigle
                    WHERE etudiant_matricule = ?`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des cours pour l\'étudiant:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};






