
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE movies RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {id: 1, title: 'The Fellowship of the Ring Extended Edition', description: 'A hobbit begins his journey', rating: 4, year: 2003, url: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-E09nIOSuQX4%2FUM0XjQbc6RI%2FAAAAAAAADPk%2FWzdvekgmYTY%2Fs1600%2Fthe-lord-of-the-rings-fellowship-of-the-rings.jpg&f=1', date: 'Christmas 2015', type: 'Fantasy'},
        {id: 2, title: 'The Two Towers Extended Edition', description: 'The Fellowship fractures, but carries on', rating: 4, year: 2005, url: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-bI18HKSFJso%2FUP_pXL9QNRI%2FAAAAAAAAA7Y%2FiH2DyZn57mY%2Fs1600%2Flord%2Bof%2Bthe%2Brings_two_towers_7.jpg&f=1', date: 'Christmas 2015', type: 'Fantasy'},
        {id: 3, title: 'The Return of the King Extended Edition', description: 'The Fellowship completes its quest', rating: 5, year: 2007, url: 'https://images.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-oC4mNUaMaGM%2FUQAQqdny94I%2FAAAAAAAAA_I%2F4I2XLKUzpls%2Fs1600%2Fthe-lord-of-the-rings-the-return-of-the-king_3.jpg&f=1', date: 'Christmas 2015', type: 'Fantasy'}
      ]);
    });
};
