const request = require('request');
const db = require('./schema');

exports.createUser = function (req, res) {
  const profile = req.body.params.profile;
  const names = profile.nickname.split(' ');
  const firstName = names[0];
  let lastName;
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
  console.log('ctrl 29');
  db.Users.findOne({
    where: { id },
    include: [{
      model: db.Packs,
      include: [{
        model: db.Users,
        attributes: ['username'],
      }],
    },
    { model: db.RunHistories },
    { model: db.Challenges },
    // { model: db.Badges },
    ],
  })
  .then((packs) => {
    console.log('ctrl 45');

    res.send(packs);
  });
};

exports.getPacks = function (req, res) {

};

exports.addRunToHistory = function (req, res) {
  const entry = req.body.params.runHistoryEntry;
  const coords = JSON.stringify(entry.coordinates);
  if (!entry.avgAltitude) {
    entry.avgAltitude = 0;
  }
  if (!entry.altitudeVariance) {
    entry.altitudeVariance = 0;
  }
  db.Users.findOne({ where: { authID: entry.userID } })
    .then((result) => {
      const newHistoryItem = db.RunHistories.build({
        startLong: entry.initialPosition.longitude,
        startLat: entry.initialPosition.latitude,
        distance: entry.distance,
        date: entry.today,
        duration: entry.duration,
        route: coords,
        UserId: result.id,
        pack: entry.currentPack,
        absAltitude: entry.avgAltitude,
        changeAltitude: entry.altitudeVariance,
      });
      newHistoryItem.save()
      .then((record) => {
        res.send(record);
      });
    });
};

exports.addToGoals = function (req, res) {
  const newGoal = db.Challenges.build({
    UserId: req.body.UserId,
    description: req.body.description,
    status: req.body.status,
    source: req.body.source,
  });
  newGoal.save()
  .then((result) => {
    res.send(result);
  });
};

exports.changeGoalStatus = function (req, res) {
  db.Challenges.update(
    { status: req.body.status },
    { where: { id: req.body.id } }
    )
  .then((result) => {
    res.send(result);
  });
};

exports.addBestThreeMile = function (req, res) {
  db.Users_Packs.update(
    { bestThreeMile: req.body.bestThreeMile },
    { where: { 
      PackId: req.body.PackId, 
      UserId: req.body.UserId 
    } }
    )
  .then((result) => {
    res.send('Added time of ' + req.body.bestThreeMile + ' seconds');
  }).catch((err) => {
    res.send("Oh no, you encountered an error");
  });
};

exports.deleteGoal = function (req, res) {
  db.Challenges.destroy({
    where: { id: req.body.id },
  }).then((result) => {
    res.send('deleted');
  });
};

exports.createPack = function (req, res) {
  const name = req.body.newPackName;
  const newPack = db.Packs.build({
    name,
    image: null,
    totalDistance: 0,
  });
  newPack.save().then((result) => {
    const newUserPack = db.Users_Packs.build({
      PackId: result.id,
      UserId: req.body.user,
      confirmed: 'TRUE',
    });
    newUserPack.save().then((result) => {
      res.send(result);
    });
  });
};

exports.getAllUsers = function (req, res) {
  db.Users.findAll({
    attributes: ['id', ['profileImage', 'image'], ['username', 'title'], ['username', 'description']],
  })
  .then((results) => {
    res.send(results);
  });
};

exports.addToPack = function (req, res) {
  const newUsersPacks = db.Users_Packs.build({
    UserId: req.body.user,
    PackId: req.body.pack,
    confirmed: 'FALSE',
  });
  newUsersPacks.save().then((result) => {
    res.send(result);
  });
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

exports.declinePack = function (req, res) {
  db.Users_Packs.destroy({
    where: {
      PackId: req.body.id,
      UserId: req.body.user,
    },
  })
  .then(() => {
    res.send('Successfully Deleted');
  })
  .catch((err) => {
    res.sendStatus(500);
    res.send(err);
  });
};

exports.acceptPack = function (req, res) {
  db.Users_Packs.update({
    confirmed: 'TRUE',
  },
    { where: {
      PackId: req.body.id,
      UserId: req.body.user,
    },
    })
  .then(() => {
    res.send('Successfully Confirmed');
  })
  .catch((err) => {
    res.sendStatus(500);
    res.send(err);
  });
};
