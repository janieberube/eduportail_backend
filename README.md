# EduPortail Backend

Bienvenue dans la documentation du serveur Node.js pour EduPortail, une application mobile de gestion de notes pour les étudiants du CCNB, développée pour être utilisée avec React Native (Android). Ce serveur agit comme backend, connectant l'application à une base de données MySQL à la fois en local et à distance.

## Prérequis

Avant de commencer à utiliser ce serveur, assurez-vous d'avoir les éléments suivants installés :

- **Node.js** : [Télécharger Node.js](https://nodejs.org/)
- **MySQL** : [Télécharger MySQL](https://www.mysql.com/)

## Configuration

1. **Clonage du dépôt** :

git clone https://github.com/votre-utilisateur/eduportail-backend.git

2. **Accès au répertoire du projet** :

cd eduportail_backend

3. **Installation des dépendances Node.js** :

npm install

4. **Configuration de la base de données MySQL** :
- Assurez-vous d’avoir configuré votre base de données MySQL (à distance ou localement). Vous pouvez populer mettre celle-ci à jour à partir du fichier : `eduportail_full_script.sql`.
- Modifiez les informations de connexion au fichier `database.js` si nécessaire (host, port, user, password, database).

## Démarrage du serveur

Le serveur sera démarré sur le port par défaut `3000`. Assurez-vous que ce port est disponible, ou modifiez le fichier `server.js` si nécessaire. Exécutez la commande suivante :

## Routes API disponibles

- `/api/etudiantsRoutes/{$matricule}` : Endpoint pour récupérer les données de l’étudiant
- `/api/coursRoutes/{$matricule}` : Endpoint pour récupérer la liste de cours 
- `/api/evaluationsRoutes/{$idInscription}` : Endpoint pour récupérer la liste d’évaluations
- `/api/sessionsRoutes/{$matricule}` : Endpoint pour récupérer la liste de sessions 
- `/api/enseignantsRoutes/{$idEvaluation_Etudiant}` : Endpoint pour récupérer l’enseignant
- `/api/programmesRoutes/{$matricule}` : Endpoint pour récupérer le programme
- `/api/moyenneSouhaiteeRoutes/{$matricule}` : Endpoint pour récupérer/modifier la moyenneSouhaitee 

## Programmeurs

- Janie Bérubé
- Clément Sonier
- André Doucet

