const cors = require('cors');
const express = require('express');
const knex = require('./db/knex.js');
const path = require('path');
const bodyParser = require('body-parser');
const movieList = require('./api/movieList.js');
const userList = require('./api/userList.js')

const app = express();

app.use(bodyParser.json());
app.use('/api/v1/movieList', movieList);
app.use('/auth', userList);
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
app.listen(process.env.PORT || 3000);

module.exports = app;
