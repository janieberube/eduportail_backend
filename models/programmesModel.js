// Fichier:             etudiantsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les programmes


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer un programme par le matricule
exports.getProgrammeParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT titreProgramme
                    FROM programmes
                    INNER JOIN campus_programmes ON programmes.idProgramme = campus_programmes.Programmes_idProgramme
                    INNER JOIN etudiants ON campus_programmes.Programmes_idProgramme = etudiants.Campus_Programmes_Programmes_idProgramme
                    WHERE etudiants.matricule = ?`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération du programme:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve(null);          // Programme introuvable
            }
            else {
                resolve(results[0]);    // Retourne le premier programme trouvé
            }
        });
    });
};


