// Fichier:             sessionsModel.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Défini le schéma (définir la structure des données) et l'interaction avec les tables pours les sessions


// Importation du module de configuration de la base de données
const pool = require('../config/database'); 


// Fonction pour récupérer les sessions par son matricule
exports.getSessionsParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT sessions.nomSession
                    FROM sessions
                    INNER JOIN inscriptions_sessions
                    ON sessions.sessionID = inscriptions_sessions.Sessions_sessionID
                    WHERE inscriptions_sessions.Etudiants_matricule = ?`, [matricule], (error, results) => {
            if (error) {
                console.error('Erreur lors de la récupération des sessions:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve(null);         
            }
            else {
                resolve(results[0]);    
            }
        });
    });
};


