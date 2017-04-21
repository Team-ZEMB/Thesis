const request = require('request');
const db = require('./schema');
var fs = require('fs');
var json2csv = require('json2csv');
const AWS = require('aws-sdk');
var ml = require('machine_learning');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  subregion: 'us-west-2',
  region: 'us-west-2',
});

var lambda = new AWS.Lambda({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET,
  subregion: 'us-west-2',
  region: 'us-west-2',
});

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
    ],
  })
  .then((packs) => {
    res.send(packs);
  });
};

exports.getPacks = function (req, res) {

};

exports.getUsersPacks = function (req, res) {
  db.Users_Packs.findAll({where: {confirmed: "TRUE"} })
    .then((results) => {
      res.send(results);
    });
};

exports.getAllPacks = function (req, res) {
  db.Packs.findAll()
    .then((results) => {
      res.send(results);
    });
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
      var newMiles = result.points + entry.distance;
      db.Users.update(
        { points: newMiles },
        { where: { id: result.id } }
        )
      .then((result) => {
        //Added total miles to users table
      })
      .catch((err) => {
        console.log(err);
      });
      if (entry.currentPack !== null) {
        var newPackMiles = 0;
        var tmpPackID = 0;
        db.Packs.findOne({ where: { name: entry.currentPack }})
        .then((packinfo) => {
          newPackMiles = packinfo.totalDistance + entry.distance;
          tmpPackID = packinfo.id;
          console.log('from',packinfo.totalDistance,'to',newPackMiles,'for',tmpPackID);
          db.Packs.update(
            { totalDistance: newPackMiles },
            { where: { id: tmpPackID }})
          .then((result) => {
            console.log("updated pack miles");
          })
          .catch((err) => {
            console.log("err 118");
            console.log(err);
          });
        }).catch((err) => { console.log(err, "line 121"); });

      }
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
      })
      .catch((err) => {
        res.send(err);
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
  })
  .catch((err) => {
    res.send(err);
  });
};

exports.changeGoalStatus = function (req, res) {
  db.Challenges.update(
    { status: req.body.status },
    { where: { id: req.body.id } }
    )
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    res.send(err);
  });
};

exports.addBestThreeMile = function (req, res) {
  db.Users_Packs.update(
    { bestThreeMile: req.body.bestThreeMile },
    { 
      where: { 
        PackId: req.body.PackId, 
        UserId: req.body.UserId, 
      } 
    }
    )
  .then((result) => {
    res.send('Added time of ' + req.body.bestThreeMile + ' seconds');
  }).catch((err) => {
    res.send("Oh no!, you encountered an error");
  });
};
exports.addBestSoloThree = function (req, res) {
  db.Users.update(
    { bestSoloThreeMi: req.body.bestThreeMile },
    { where: {
        id: req.body.UserId
      } 
    }
    )
  .then((result) => {
    res.send("Success");
  }).catch((err) => {
    res.send("Error");
  });
};

exports.deleteGoal = function (req, res) {
  db.Challenges.destroy({
    where: { id: req.body.id },
  }).then((result) => {
    res.send('deleted');
  })
  .catch((err) => {
    res.send(err);
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
    })
    .catch((err) => {
      res.send(err);
    });
  })
  .catch((err) => {
    res.send(err);
  });
};

exports.getAllUsers = function (req, res) {
  db.Users.findAll({
    attributes: ['id', ['profileImage', 'image'], ['username', 'title'], ['username', 'description']],
  })
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    res.send(err);
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
  })
  .catch((err) => {
    res.send(err);
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
    })
    .catch((err) => {
      res.send(err);
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

exports.getBestThree = function (req, res) {
  db.Users.findAll({
    where: {
      bestSoloThreeMi: {
        $ne: null,
      },
    },
    order: 'bestSoloThreeMi',
    limit: 3,
  })
  .then((results) => {
    res.send(results)
  });
};

exports.createMachineGoal = function (req, res) {
  db.Users.findOne({
    where: { 
      id: req.body.UserId 
    }
  })
  .then((result) => {
    console.log(result.lastMachineGoal)
    if ((Date.now() - result.lastMachineGoal) / (1000 * 60 * 60 * 24) > 7 || result.lastMachineGoal === null) {
      db.RunHistories.findAll({where: { UserId : req.body.UserId }})
        .then((result) => {
          if (result.length > 4) {
            var formatted = [];
            for (var i = 0; i < result.length; i++) {
              var d = result[i].date;
              var n = new Date(d).toString();
              var hour = n.substring(16, 18);
              if (hour < 12) {
                hour = "Morning";
              } else if (hour < 17) {
                hour = "Afternoon";
              } else {
                hour = "Evening";
              }
              var tmp = {};
              tmp.duration = result[i].duration;
              tmp.distance = result[i].distance;
              tmp.dayOfWeek = new Date(n).getDay();
              tmp.timeOfDay = hour;
              tmp.absAltitude = result[i].absAltitude;
              tmp.changeAltitude = result[i].changeAltitude;
              formatted.push(tmp);
            }
            // var x = []
            // var y = []
            // for (var i=0; i<formatted.length; i++) {
            //   var tmp = [formatted[i].absAltitude, formatted[i].changeAltitude, formatted[i].distance]
            //   var rate = formatted[i].distance / (formatted[i].duration)
            //   x.push([rate, formatted[i].distance]);
            //   y.push(formatted[i].timeOfDay)
            // }
            // var dt = new ml.DecisionTree({
            //     data: x,
            //     result: y
            // });
            // dt.build();
            // dt.print();
            // var tree = dt.getTree();
            // while (tree.results === undefined) {
            //   tree = tree.tb
            // }
            // res.send(Object.keys(tree.results))

            var csvdata = json2csv({ data: formatted, fields: ['distance', 'duration', 'dayOfWeek', 'timeOfDay', 'absAltitude', 'changeAltitude'] });
            s3.upload({
              Bucket: 'csvbucketforml',
              accessKeyId: process.env.S3_ACCESS_KEY,
              secretAccessKey: process.env.S3_SECRET,
              subregion: 'us-west-2',
              Key: 'testCSV.csv',
              Body: csvdata,
              ACL: 'public-read-write',  
            }, (err, data) => {
              if (err) {
                console.log(err);
              } 
              var params = {
                FunctionName: "createRabbitGoal", 
                InvocationType: "RequestResponse"
              }; 
              lambda.invoke(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                  // console.log(data);
                  // res.send(JSON.parse(data.Payload)); //skb
                  db.Users.update({
                    lastMachineGoal: Date.now(),
                    machineGoal: data.Payload },
                    { where: {
                      id: req.body.UserId
                    }
                  })
                  .then((goal) => {
                    res.send(JSON.stringify(data.Payload))
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                }     
              });
            });
          } else {
            res.send("Under 7 days");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send("Under 7 days");
    }
  })
};