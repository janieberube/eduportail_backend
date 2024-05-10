// Fichier:             enseignantsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les enseignants


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer un enseignant par le id du cours livré pour un étudiant
exports.getEnseignantParIdCoursLivre = (idEvaluation_Etudiant) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT enseignants.prenom, enseignants.nom
                    FROM enseignants
                    INNER JOIN cours_livres ON cours_livres.Enseignants_idEnseignant = enseignants.idEnseignant
                    INNER JOIN inscriptions ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    INNER JOIN etudiants ON etudiants.matricule = inscriptions.Etudiant_matricule
                    WHERE inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                    AND inscriptions.Etudiant_matricule = etudiants.matricule
                    AND cours_livres.idCours_Livre = ?`, [idEvaluation_Etudiant], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération de l\'enseignant:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve(null);          // Enseignant introuvable
            }
            else {
                resolve(results[0]);    // Retourne le premier enseignant trouvé
            }
        });
    });
};


