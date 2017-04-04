const myRouter = require('express').Router();
const controller = require('./controller');
const db = require('./schema');

myRouter.route('/userstest')
  .post((req, res) => {
    db.Users.findAll({ where: { authID: req.body.params.userID } })
    .then((result) => {
      if (result.length === 0) {
        console.log("Body",req.body)
        console.log("Paramus",req.params)
      } else {
        console.log("Body2",req.body)
        console.log("Param2s",req.params)
      }
    });
  });

myRouter.route('/users')
  .post((req, res) => {
    db.Users.findAll({ where: { authID: req.body.params.userID } })
    .then((result) => {
      if (result.length === 0) {
        controller.createUser(req, res);
      } else {
        controller.returnUserData(req, res, result[0].id);
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
