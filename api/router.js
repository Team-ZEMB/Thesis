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
    })
  });

myRouter.route('/runHistory')
  .post((req, res) => {
    controller.addRunToHistory(req, res);
  });

myRouter.route('/newPack')
  .get((req, res) => {
    controller.getPacks(req, res);
  })
  .post((req, res) => {
    controller.createPack(req, res);
  });

module.exports = myRouter;
