// Fichier:             database.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Configuration de la connexion de la base de données MySQL 


/*
Explication:            Utiliser ce fichier dans l'application Node.js pour établir des connexions avec la base de données MySQL et intéragir avec celle-ci (exécuter des requêtes).
*/

const mysql = require('mysql');


// Créer le pool de connexions
// Il gère l'ouverture et la fermeture les connexions a la BD automatiquement (particularité de Node.js)



// BD distante
/*
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
    port: 3306,
    user: 'root',
    password: '',
    database: 'eduportail'
});


// Exporter le pool pour une utilisation partagée dans toute l'application
module.exports = pool;


