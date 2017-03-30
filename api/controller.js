const request = require('request');
const db = require('./schema');

exports.createUser = function (req, res) {
  const newuser = db.User.build({
    username: req.query.username,
    email: req.query.email,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    profileImage: req.query.profileImage,
    points: 0,
  });
  newuser.save()
  .then((record) => {
    res.send(record);
  });
};

exports.signIn = function (req, res) {
  db.User.findOne({ where: { unique: req.query.unique } })
  .then((results) => {
    res.send(results);
  });
};
