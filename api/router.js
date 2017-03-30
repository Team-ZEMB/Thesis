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


module.exports = myRouter;
