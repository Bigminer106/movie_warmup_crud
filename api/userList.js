const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const bcrypt = require('bcrypt');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
    next(new Error('Invalid ID'));
  };
};

function validUser(user) {
  const hasName = typeof user.username == 'string' && user.name.trim() != '';
  const hasPW = typeof user.password == 'string' && user.password.trim() != '';
  const hasEmail = typeof user.email == 'string' && user.email.trim() != '';
};

router.post('/auth/signup', (req, res, next) => {
  var hash = bcrypt.hashSync(req.params.password, 8);
  users().insert({
    email: req.params.email,
    password: hash
  }, 'id').then(result => {
    res.redirect('/auth/login')
  })
});

router.post('/auth/login', (req, res, next) => {
  users().where({
    email: req.params.email,
  }).first().then(user => {
    if(user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user.username;
        res.redirect('/');
      } else {
        res.redirect('/auth/login');
      }
    } else {
      res.redirect('/auth/login');
    }
  })
});
