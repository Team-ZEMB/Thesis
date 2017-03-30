const myRouter = require('express').Router();
const controller = require('./controller');
const db = require('./db');

myRouter.route('/users')
  .get((req, res) => {
    db.User.findAll({ where: { unique: req.query.unique } })
    .then((result) => {
      if (result.length === 0) {
        controller.createUser(req, res);
      } else {
        controller.returnUserData(req, res);
      }
    });
  });

myRouter.route('/packs')
  .get((req, res) => {
    controller.getPacks(req, res);
  })
  .post((req, res) => {
    controller.createPack(req, res);
  });

module.exports = myRouter;
