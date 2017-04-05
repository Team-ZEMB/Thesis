const Sequelize = require('sequelize');
const db = require('./db.js');

const Users = db.define('Users', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  profileImage: Sequelize.STRING,
  points: Sequelize.INTEGER,
  authID: Sequelize.STRING,
});

const Badges = db.define('Badges', {
  badgeName: Sequelize.STRING,
  qualifier: Sequelize.STRING,
  image: Sequelize.STRING,
  description: Sequelize.STRING,
});

const RunHistories = db.define('RunHistories', {
  startLong: Sequelize.FLOAT,
  startLat: Sequelize.FLOAT,
  distance: Sequelize.FLOAT,
  duration: Sequelize.INTEGER, // in seconds
  date: Sequelize.DATE,
  route: Sequelize.TEXT,
});

const Challenges = db.define('Challenges', {
  description: Sequelize.STRING, // limit to 30 chars
  status: Sequelize.STRING, // completed, pending, accepted
  source: Sequelize.INTEGER, // source user id of challenge .. null for goals
});

const Packs = db.define('Packs', {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  totalDistance: Sequelize.FLOAT,
});

const Users_Packs = db.define('Users_Packs');
const Users_Pending_Packs = db.define('Users_Pending_Packs', {
  sentBy: Sequelize.INTEGER,
});
const Users_Badges = db.define('Users_Badges');

Users.belongsToMany(Packs, { through: Users_Packs });
Packs.belongsToMany(Users, { through: Users_Packs });
Users_Pending_Packs.belongsTo(Users);
Users_Pending_Packs.belongsTo(Packs); //remove users pending packs, add flag for accepted or not
Users.hasMany(Users_Pending_Packs);
Users.belongsToMany(Badges, { through: Users_Badges });
Badges.belongsToMany(Users, { through: Users_Badges });
Users.hasMany(RunHistories);
RunHistories.belongsTo(Users);
Users.hasMany(Challenges);
Challenges.belongsTo(Users);


Users.sync();
Packs.sync();
Users_Packs.sync();
Users_Pending_Packs.sync();
Badges.sync();
Users_Badges.sync();
RunHistories.sync();
Challenges.sync();


exports.Users = Users;
exports.Packs = Packs;
exports.Users_Packs = Users_Packs;
exports.Users_Pending_Packs = Users_Pending_Packs;
exports.Badges = Badges;
exports.Users_Badges = Users_Badges;
exports.RunHistories = RunHistories;
exports.Challenges = Challenges;
