const request = require('request');
const db = require('./schema');

exports.createUser = function (req, res) {
  var profile = req.body.params.profile;
  var names = profile.nickname.split(' ');
  var firstName = names[0];
  var lastName;
  names[1] !== undefined ? lastName = names[1] : lastName = '';
  if (profile.username === undefined) {
    profile.username = profile.nickname;
  }
  const newuser = db.Users.build({
    username: profile.username,
    email: profile.email,
    firstName,
    lastName,
    profileImage: profile.picture,
    points: 0,
    authID: req.body.params.userID,
  });
  newuser.save()
  .then((record) => {
    res.send(record);
  });
};

exports.returnUserData = function (req, res, id) {
  console.log(id)
  db.Users.findOne({ where: { id } })
  .then((results) => {
    res.send(results);
  });
};

exports.getPacks = function (req, res) {

};
exports.addRunToHistory = function (req, res) {
  console.log(req.body);
  console.log(req.params);
  
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
