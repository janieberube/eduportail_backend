// etudiantsModel.js
// define the schema and interacting with the etudiants table

const pool = require('../config/database'); 

// Function to retrieve all etudiants from the db
exports.getTousLesEtudiants = (resolve, reject) => {
    pool.query('SELECT * FROM etudiants', (error, results) => {
        if (error) {
            console.error('Error fetching etudiants:', error);
            reject(error);
            return;
        }
        resolve(results);
    });
};

// Function to retrieve etudiant by matricule from the db
exports.getEtudiantParMatricule = (matricule) => {
    return new Promise((resolve, reject) => {
        // Retrieve etudiant from the db by matricule
        pool.query('SELECT * FROM etudiants WHERE id = ?', [matricule], (error, results) => {
            if (error) {
                console.error('Error fetching etudiant:', error);
                reject(error);
                return;
            }
            if (results.length === 0) {
                resolve(null);  // User not found
            }
            else {
                resolve(results[0]);    // Return the first user found
            }
        });
    });
};

/*
userModel:          The model represents the data and business logic of the application. It interacts with the database 
                    to perform CRUD (Create, Read, Update, Delete) operations on the data. In the case of a userModel, it might include functions 
                    for querying the database to retrieve user data, inserting new users into the database, updating existing users, deleting users, 
                    and any other database-related operations specific to users.
*/
