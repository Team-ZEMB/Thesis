const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const myRouter = require(`${__dirname}/api/router.js`);

const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.static('./output'));
app.use('/api', myRouter);

app.use(cors())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/output/index.html`);
});
const server = app.listen(port, () => {
  console.log(`connected to ${port}`);
});

module.exports = app;
