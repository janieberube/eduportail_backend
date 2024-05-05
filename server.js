// server.js
// set up a HTTP server using the Express.js framework

const express = require('express');
const etudiantsRoutes = require('./routes/etudiantsRoutes');

// Create Express application
const app = express();

// Define a route 
app.get('/', (req, res) => {
    res.send('Successfully running server.js file, yihoo!');
  });

// Define routes with the /api namespace
app.use('/api', etudiantsRoutes);

// Start the server 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// This file enables us to run the Node.js server (using the command 'node server.js in command prompt')
