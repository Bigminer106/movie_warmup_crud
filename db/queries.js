const knex = require('./knex.js');

module.exports = {
  getAllMovies(movies) {
    return knex('movies', movies);
  },
  getOneMovie(id) {
    return knex('movies').where('id', id).first();
  },
  createMovie(movie) {
    return knex('movies').insert(movie, '*');
  },
  updateMovie(id, movie) {
    return knex('movies').where('id', id).update(movie);
  },
  deleteMovie(id) {
    return knex('movies').where('id', id).del();
  },
  getAll(users) {
    return knex('users', users);
  },
  getOne(id) {
    return knex('users').where('id', id).first();
  },
  update(id, user) {
    return knex('users').where('id', id).update(user);
  },
  create(user) {
    return knex('users').insert(user, '*');
  },
  create(id) {
    return knex('users').where('id', id).first();
  },
  delete(id) {
    return knex('users').where('id', id).del();
  }
}
