const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
    next(new Error('Invalid ID'));
  };
};

function validMovie(movie) {
  const hasTitle = typeof movie.title == 'string' && movie.title.trim() != '';
  const hasDescription = typeof movie.description == 'string' && movie.description.trim() != '';
  const hasRating = !isNaN(movie.rating);
  const hasYear = !isNaN(movie.year);
  const hasImage = typeof movie.url == 'string' && movie.url.trim() != '';
  const hasDate = typeof movie.date == 'string' && movie.date.trim() != '';
  const hasType = typeof movie.type == 'string' && movie.type.trim() != '';
  return hasTitle && hasDescription && hasRating && hasYear && hasImage && hasDate && hasType;
};

router.get('/', (req, res) => {
  queries.getAll().then(movies => {
    res.json(movies);
  });
});

router.get('/:id', (req, res) => {
  queries.getOne(req.params.id).then(movie => {
    res.json(movie);
  });
});

router.post('/', (req, res, next) => {
  if (validMovie(req.body)) {
    queries.create(req.body).then(movies => {
      res.json(movies[0]);
    })
  } else {
    next(new Error('Invalid Movie'));
  };
});

router.put('/:id', isValidId, (req, res, next) => {
  if (validMovie(req.body)) {
    queries.update(req.params.id, req.body).then(movies => {
      res.json(movies[0]);
    })
  } else {
    next(new Error('Invalid Movie'));
  };
});

router.delete('/:id', isValidId, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
