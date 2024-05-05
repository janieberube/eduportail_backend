// etudiantsController.js
// handle user-related logic for etudiants

const pool = require('../config/database'); 

// Controller method to retrieve all etudiants
exports.getTousLesEtudiants = (req, res) => {
    pool.query('SELECT prenom FROM etudiants', (error, results) => {
        if (error) {
            console.error('Error fetching etudiants:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json(results);
    });
};

// Controller method to retrieve etudiant by matricule
exports.getEtudiantParMatricule = (req, res) => {
    const matricule = req.params.matricule;
    pool.query('SELECT * FROM etudiants WHERE matricule = ?', [matricule], (error, results) => {
        if (error) {
            console.error('Error fetching etudiant:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Étudiant introuvable' });
            return;
        }
        res.status(200).json(results[0]);
    });
};

/*
etudiantsController:     The controller is responsible for handling incoming HTTP requests, processing data, and returning appropriate HTTP responses. 
                        It typically contains methods that define the application's behavior and business logic. In the case of a etudiantsController, it might include 
                        methods for creating, retrieving, updating, and deleting etudiants, as well as any other etudiants-related operations.
*/