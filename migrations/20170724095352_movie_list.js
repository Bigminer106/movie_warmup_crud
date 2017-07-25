
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.float('rating').notNullable();
    table.float('year').notNullable();
    table.text('url').notNullable();
    table.text('date').notNullable();
    table.text('type').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies');
};
