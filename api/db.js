const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.load();


// database connection to ClearDB
const db = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@zemb.civvtjgo9fft.us-west-2.rds.amazonaws.com/zembdb`, {
  port: 3306,
  timestamps: false,
});

db.authenticate()
  .then(() => {
    console.log("Successfully connected to DB")
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = db;
