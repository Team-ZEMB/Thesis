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

exports.getPacks = function (req, res) {

};

exports.createPack = function (req, res) {
  const newPack = db.Packs.build({
    name: req.query.name,
    image: req.query.img,
    totalDistance: 0,
  });
newPack.save().then((result) => {
  const newUserPack = db.Users_Packs.build({
    PackId: result.id,
  })
})
};

exports.acceptRequest = function (req, res) {
  const requestID = req.body.id;
  db.Users_Pending_Packs.find({ where: { id: requestID } })
    .then((result) => {
      const newMember = db.Users_Packs.build({
        UserID: result.UserID,
        PackID: result.PackID,
      });
      newMember.save()
      .then((record) => {
        db.Users_Pending_Packs.destroy({ where: { id: requestID } });
        res.send(record);
      })
      .catch((err) => {
        res.sendStatus(500);
        res.send(err);
      });
    });
};

exports.declineRequest = function (req, res) {
  const requestID = req.body.id;
  db.Users_Pending_Packs.destroy({ where: { id: requestID } })
  .then(() => {
    res.send('Successfully Deleted');
  })
  .catch((err) => {
    res.sendStatus(500);
    res.send(err);
  });
};
