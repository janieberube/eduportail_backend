// Fichier:             database.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Configuration de la connexion de la base de données MySQL 

/*
You can now use this database.js file in your Node.js application to establish connections to your MySQL database and execute queries. 
When you need to interact with the database, import the database.js file into your other modules and use the connection pool to execute queries.
Remember to handle errors and close database connections appropriately in your application to ensure proper resource management and error handling.
*/

/*
Explication:            Utiliser ce fichier dans l'application Node.js pour établir des connexions avec la base de données MySQL et intéragir avec celle-ci (exécuter des requêtes).
                        N'oubliez pas de gérer les erreurs et de fermer les connexions à la base de données de manière appropriée dans votre application pour assurer une gestion des ressources et des erreurs adéquate.
*/

const mysql = require('mysql');


// Créer le pool de connexions
// Il gère l'ouverture et la fermeture les connexions a la BD automatiquement (particularité de Node.js)


/*
// BD distante
const pool = mysql.createPool({
    host: 'qf5dic2wzyjf1x5x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'nn2sv8r76frguu1j',
    password: 'f6btu922dkwpbpkl',
    database: 'kxqlkxy9ovy8mg96'
});
*/


// BD locale (pour testing)
const pool = mysql.createPool({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'PortailCcnb2024*',
    database: 'eduportail'
});


// Exporter le pool pour une utilisation partagée dans toute l'application
module.exports = pool;


