// Fichier:             programmesController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux utilisateurs pour les programmes


// Importation du module de configuration de la base de données 
const pool = require('../config/database'); 


// Méthode du contrôleur pour récupérer un programme par le matricule
exports.getProgrammeParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query(`SELECT titreProgramme
                FROM programmes
                INNER JOIN campus_programmes ON programmes.idProgramme = campus_programmes.Programmes_idProgramme
                INNER JOIN etudiants ON campus_programmes.Programmes_idProgramme = etudiants.Campus_Programmes_Programmes_idProgramme
                WHERE etudiants.matricule = ?`, [matricule], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération du programme:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du programme: ' + error.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Programme introuvable' });
            return;
        }
        res.status(200).json(results[0]);
    });
};

