const myRouter = require('express').Router();
const controller = require('./controller');
const db = require('./schema');

myRouter.route('/users')
  .post((req, res) => {
    db.Users.findAll({ where: { authID: req.body.params.userID } })
    .then((result) => {
      if (result.length === 0) {
        controller.createUser(req, res);
      } else {
        controller.returnUserData(req, res, result[0].id);
      }
    })
    .catch((err) => {
      res.send(err);
    });
  });

myRouter.route('/runHistory')
  .post((req, res) => {
    controller.addRunToHistory(req, res);
  });

myRouter.route('/goals')
  .post((req, res) => {
    controller.addToGoals(req, res);
  });

myRouter.route('/goals')
  .put((req, res) => {
    controller.changeGoalStatus(req, res);
  });

myRouter.route('/goals')
  .delete((req, res) => {
    controller.deleteGoal(req, res);
  });

myRouter.route('/newPack')
  .get((req, res) => {
    controller.getPacks(req, res);
  })
  .post((req, res) => {
    controller.createPack(req, res);
  });

myRouter.route('/addToPack')
  .post((req, res) => {
    controller.addToPack(req, res);
  });

myRouter.route('/packs')
  .get((req, res) => {
    controller.getAllPacks(req, res);
  });

myRouter.route('/packs')
  .put((req, res) => {
    controller.acceptPack(req, res);
  })
  .delete((req, res) => {
    controller.declinePack(req, res);
  });

myRouter.route('/getAllUsers')
  .get((req, res) => {
    controller.getAllUsers(req, res);
  });

myRouter.route('/king')
  .get((req, res) => {
    controller.getUsersPacks(req, res);
  });

myRouter.route('/king')
  .put((req, res) => {
    controller.addBestThreeMile(req, res);
  });
  
myRouter.route('/soloKing')
  .get((req, res) => {
    controller.getBestThree(req, res);
  })
  .put((req, res) => {
    controller.addBestSoloThree(req, res);
  });

myRouter.route('/machineGoal')
  .post((req, res) => {
    controller.createMachineGoal(req, res);
  });

module.exports = myRouter;
