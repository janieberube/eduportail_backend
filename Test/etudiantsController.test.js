const { expect } = require('chai');
const sinon = require('sinon');
const userController = require('../controllers/etudiantsController');
const userModel = require('../models/etudiantsModel');

describe('EtudiantsController', () => {
  describe('getTousLesEtudiants', () => {
    it('should return all etudiants', async () => {
      // Stub userModel.getTousLesEtudiants to return mock data
      const mockEtudiants = [{ matricule: 2577423, name: 'Etudiant 1' }, { id: 2754356, name: 'Etudiant 2' }];
      sinon.stub(etudiantsModel, 'getTousLesEtudiants').resolves(mockEtudiants);

      // Mock Express req and res objects
      const req = {};
      const res = { json: sinon.stub() };

      // Call the controller method
      await userController.getTousLesEtudiants(req, res);

      // Verify the response
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.deep.equal(mockEtudiants);

      // Restore the stub
      etudiantsModel.getTousLesEtudiants.restore();
    });
  });

  // Add more test cases for other controller methods as needed
});

/*
    We use Mocha's describe and it functions to define test suites and test cases.
    We use Chai's expect assertion library to make assertions about the expected behavior of the controller methods.
    We use Sinon.js to create stubs for the userModel.getTousLesEtudiants method, allowing us to control its behavior during testing.
    Inside the test case, we call the controller method (etudiantsController.getTousLesEtudiants) with mock request and response objects, 
    then verify that the response matches the expected output.
*/