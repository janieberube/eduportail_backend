// Fichier:             etudiantsController.test.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Fichier test pour le test du comportement des fonctions de etudiantsController.js

/*
Necéssaire:     Mocha, Sinon et Chai
                    installation: npm install --save-dev mocha sinon chai

Pour tester:    Utiliser le Mocha test runner
                    mocha etudiantsController.test.js           
*/


// Importation des modules
const sinon = require('sinon');     // Sinon: création de stubs pour contrôler son comportement durant le testing
const etudiantsController = require('../controllers/etudiantsController');        
const etudiantsModel = require('../models/etudiantsModel');

async function runTests() {

    // Importation de chai: assertion library (vérification du comportement des méthodes de etudiantsController.js)
    const chai = await import('chai'); 
    const { expect } = chai;

    // Définition des tests avec Mocha (fonctions it, describe) pour définir les tests
    describe('EtudiantsController', () => {

        describe('getTousLesEtudiants', () => {

            it('should return all etudiants', async () => {

                // Stub etudiantsModel.getTousLesEtudiants pour retourner le mock data
                const mockEtudiants = [{ matricule: 2577423, name: 'Etudiant 1' }, { id: 2754356, name: 'Etudiant 2' }];
                sinon.stub(etudiantsModel, 'getTousLesEtudiants').resolves(mockEtudiants);

                // Objets req et res de Mock Express
                const req = {};
                const res = { json: sinon.stub() };

                // Appel de la méthode du controlleur
                await etudiantsController.getTousLesEtudiants(req, res);

                // Vérification de la réponse (correspond au output attendu?)
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.firstCall.args[0]).to.deep.equal(mockEtudiants);

                // Restoration du stub
                etudiantsModel.getTousLesEtudiants.restore();

            });

        });

    });

}

runTests(); 


