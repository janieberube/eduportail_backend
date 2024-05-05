// database.js
// MySQL database connection

const mysql = require('mysql');

// Create connection pool
const pool = mysql.createPool({
    host: 'qf5dic2wzyjf1x5x.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'nn2sv8r76frguu1j',
    password: 'f6btu922dkwpbpkl',
    database: 'kxqlkxy9ovy8mg96'
});

// Export the pool for shared use across the application
module.exports = pool;

/*
You can now use this database.js file in your Node.js application to establish connections to your MySQL database and execute queries. 
When you need to interact with the database, import the database.js file into your other modules and use the connection pool to execute queries.
Remember to handle errors and close database connections appropriately in your application to ensure proper resource management and error handling.
*/