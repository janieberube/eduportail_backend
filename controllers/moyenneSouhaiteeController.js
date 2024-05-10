// Fichier:             etudiantsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée à la moyenne souhaitee


// Importation du module de configuration de la base de données 
const pool = require('../config/database'); 


// Méthode du contrôleur pour récupérer une moyenne souhaitée par le matricule
exports.getMoyenneSouhaiteeParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT moyenneSouhaitee
                FROM inscriptions_sessions
                INNER JOIN sessions ON sessions.sessionID = inscriptions_sessions.Sessions_sessionID
                WHERE CURRENT_DATE() >= sessions.dateDebutSession 
                AND CURRENT_DATE() <= sessions.dateFinSession
                AND inscriptions_sessions.Etudiants_matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de la moyenne souhaitée:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de la moyenne souhaitée: ' + error.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Moyenne souhaitée introuvable' });
            return;
        }
        res.status(200).json(results[0]);
    });
};

// Méthode du contrôleur pour effectuer la mise à jour de la moyenne souhaitée par le matricule
exports.updateMoyenneSouhaitee = (req, res) => {
    const matricule = req.params.matricule;
    const newMoyenneSouhaitee = req.body.newMoyenneSouhaitee; 
    pool.query(`UPDATE inscriptions_sessions
                INNER JOIN sessions ON sessions.sessionID = inscriptions_sessions.Sessions_sessionID
                SET inscriptions_sessions.moyenneSouhaitee = ?
                WHERE CURRENT_DATE() >= sessions.dateDebutSession 
                AND CURRENT_DATE() <= sessions.dateFinSession
                AND inscriptions_sessions.Etudiants_matricule = ?`, [newMoyenneSouhaitee, matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la mise a jour de la moyenne souhaitée:', error);
            res.status(500).json({ error: 'Error updating moyenneSouhaitee: ' + error.message });
            return;
        }
        res.status(200).json({ message: 'Moyenne souhaitée mise à jour.' });
    });
};
