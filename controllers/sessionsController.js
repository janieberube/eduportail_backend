// Fichier:             sessionsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux utilisateurs pour les sessions


// Importation du module de configuration de la base de données 
const pool = require('../config/database'); 


// Méthode du contrôleur pour récupérer les sessions par le matricule
exports.getSessionsParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT sessions.nomSession
                FROM sessions
                INNER JOIN inscriptions_sessions
                ON sessions.sessionID = inscriptions_sessions.Sessions_sessionID
                WHERE inscriptions_sessions.Etudiants_matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des sessions:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des sessions: ' + error.message });
            return;
        }
        res.status(200).json(results);
    });
};

// Méthode du contrôleur pour récupérer la session actuelle par le matricule
exports.getSessionActuelleParMatricule = (req, res) => {
    const matricule = req.params.matricule; 
    pool.query(`SELECT sessions.nomSession
                FROM sessions
                INNER JOIN inscriptions_sessions
                ON sessions.sessionID = inscriptions_sessions.Sessions_sessionID
                WHERE inscriptions_sessions.Etudiants_matricule = ?
                AND CURRENT_DATE() >= sessions.dateDebutSession 
                AND CURRENT_DATE() <= sessions.dateFinSession`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de la session actuelle:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la session actuelle: ' + error.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Aucune session actuelle trouvée pour ce matricule' });
        } else {
            res.status(200).json(results[0]); // Retourne la session actuelle
        }
    });
};
