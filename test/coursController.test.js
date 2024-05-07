// Fichier:             coursController.test.js
// Programmeurs:        Janie Bérubé, Clément Sonier, André Doucet
// Bût:                 Fichier test pour le test du comportement des fonctions de coursController.js

/*
Necéssaire:     Mocha, Sinon et Chai
                    installation:   npm install -g mocha sinon chai

Pour tester:    Utiliser le Mocha test runner
                    mocha coursController.test.js           
*/


// Importation des modules
const sinon = require('sinon');     // Sinon: création de stubs pour contrôler son comportement durant le testing
const coursController = require('../controllers/coursController');        
const coursModel = require('../models/coursModel');

async function runTests() {

    // Importation de chai: assertion library (vérification du comportement des méthodes de coursController.js)
    const chai = await import('chai'); 
    const { expect } = chai;

    // Définition des tests avec Mocha (fonctions it, describe) pour définir les tests
    describe('coursController', () => {

        describe('getTousLescours', () => {

            it('should return all cours', async () => {

                // Stub coursModel.getTousLescours pour retourner le mock data
                const mockcours = [{ matricule: 2577423, name: 'Etudiant 1' }, { id: 2754356, name: 'Etudiant 2' }];
                sinon.stub(coursModel, 'getTousLescours').resolves(mockcours);

                // Objets req et res de Mock Express
                const req = {};
                const res = { json: sinon.stub() };

                // Appel de la méthode du controlleur
                await coursController.getTousLescours(req, res);

                // Vérification de la réponse (correspond au output attendu?)
                expect(res.json.calledOnce).to.be.true;
                expect(res.json.firstCall.args[0]).to.deep.equal(mockcours);

                // Restoration du stub
                coursModel.getTousLescours.restore();

            });

        });

    });

}

runTests(); 


