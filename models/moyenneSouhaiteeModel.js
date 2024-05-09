// Fichier:             moyenneSouhaiteeModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec le champ moyenneSouhaitee (inscriptions_sessions)


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer une moyenne souhaitée par le matricule
exports.getMoyenneSouhaiteeParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT moyenneSouhaitee
                    FROM inscriptions_sessions
                    INNER JOIN sessions ON sessions.sessionID = inscriptions_sessions.Sessions_sessionID
                    WHERE CURRENT_DATE() >= sessions.dateDebutSession 
                    AND CURRENT_DATE() <= sessions.dateFinSession
                    AND inscriptions_sessions.Etudiants_matricule = ?`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération de la moyenne souhaitée:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve(null);          // Moyenne souhaitée introuvable
            }
            else {
                resolve(results[0]);    
            }
        });
    });
};


