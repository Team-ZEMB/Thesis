const myRouter = require('express').Router();
const controller = require('./controller');
const fs = require('fs');
const db = require('./schema');


myRouter.route('/users')
  .get((req, res) => {
    controller.someFunction(req, res);
  })
  .post((req, res) => {
    controller.anotherFunction(req, res);
  });


module.exports = myRouter;
