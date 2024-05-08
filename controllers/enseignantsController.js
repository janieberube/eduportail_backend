// Fichier:             enseignantsController.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Gérer la logique liée aux utilisateurs pour les enseignants


// Importation du module de configuration de la base de données 
const pool = require('../config/database'); 


// Méthode du contrôleur pour récupérer un enseignant par le id de l'évaluation pour un étudiant
exports.getEnseignantsParIdEvalEtudiant = (req, res) => {
    const idEvaluation_Etudiant = req.params.idEvaluation_Etudiant;
    pool.query(`SELECT enseignants.prenom, enseignants.nom
                FROM enseignants
                INNER JOIN cours_livres ON cours_livres.Enseignants_idEnseignant = enseignants.idEnseignant
                INNER JOIN inscriptions ON inscriptions.Cours_Livres_idCours_Livre = cours_livres.idCours_Livre
                INNER JOIN evaluations_etudiants ON evaluations_etudiants.Inscriptions_idInscription = inscriptions.idInscription
                INNER JOIN evaluations ON evaluations.idEvaluation = evaluations_etudiants.Evaluations_idEvaluation
                WHERE evaluations_etudiants.idEvaluation_Etudiant = ?`, [idEvaluation_Etudiant], (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération de l\'enseignant:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'enseignant: ' + error.message });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Enseignant introuvable' });
            return;
        }
        res.status(200).json(results[0]);
    });
};


