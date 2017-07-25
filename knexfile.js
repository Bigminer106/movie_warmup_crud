// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/movie_inventory_crud'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
