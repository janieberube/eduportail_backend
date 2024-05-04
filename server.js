// server.js
// set up a HTTP server using the Express.js framework

const express = require('express');

// Create Express application
const app = express();

// Define a route 
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });


/*
//COURS
// Define a route to fetch courses for a student from the database
app.get('/api/courses/:matricule', (req, res) => {
    const { matricule } = req.params;
    
    if (!matricule) {
      res.status(400).json({ error: 'Matricule is required' });
      return;
    }
  
    const sql = 'SELECT * FROM inscriptions WHERE Etudiant_matricule = ?';
    connection.query(sql, [matricule], (error, results) => {
      if (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });
  */

  // Start the server 
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Server is running on port ${port}');
  });

  // This file enables us to run the Node.js server (using the command 'node server.js in command prompt')
  