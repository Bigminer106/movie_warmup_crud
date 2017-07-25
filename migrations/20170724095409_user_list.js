
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('username').notNullable();
    table.text('password').notNullable();
    table.text('email').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
