const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE movies RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'randoJS', password: bcrypt.hashSync('password', 8)},
        {id: 2, username: 'randoVue', password: bcrypt.hashSync('password', 8)},
      ]);
    });
};
