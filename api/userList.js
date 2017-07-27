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

router.get('/', (req, res) => {
  var hash = bcrypt.hashSync(req.params.password, 8);
  queries.getAll().then(users => {
    res.json(users);
  });
});

router.get('/:id', (req, res) => {
  queries.getOne(req.params.id).then(user => {
    res.json(user);
  });
});

router.put('/:id', isValidId, (req, res, next) => {
  if (validUser(req.body)) {
    queries.update(req.params.id, req.body).then(users => {
      res.json(users[0]);
    })
  } else {
    next(new Error('Invalid User'));
  };
});

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

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
