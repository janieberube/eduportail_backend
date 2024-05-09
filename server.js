// Fichier:             server.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Description:         Configuration d'un serveur HTTP avec le Express.js framework
//                      MVC (Model-View-Controller) architecture pattern
//                      Permet d'exécuter le serveur Node.js (commande au terminal: node server.js)


const express = require('express');

const etudiantsRoutes = require('./routes/etudiantsRoutes');
const coursRoutes = require('./routes/coursRoutes');
const evaluationsRoutes = require('./routes/evaluationsRoutes');
const sessionsRoutes = require('./routes/sessionsRoutes');
const enseignantsRoutes = require('./routes/enseignantsRoutes');
const programmesRoutes = require('./routes/programmesRoutes')

// Créer une application Express
const app = express();


// Définir une route 
app.get('/', (req, res) => {
    res.send('Exécution réussie du fichier server.js');
  });


// Définir les routes avec le namspace /api
app.use('/api', etudiantsRoutes);
app.use('/api', coursRoutes);
app.use('/api', evaluationsRoutes);
app.use('/api', sessionsRoutes);
app.use('/api', enseignantsRoutes);
app.use('/api', programmesRoutes);

// Commencer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port ${port}`);
});

