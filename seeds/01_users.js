exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          email: 'jim.carrey@joke.com',
          first_name: 'Jim',
          last_name: 'Carrey'
        },
        {
          id: 2,
          email: 'cap@avengers.com',
          first_name: 'Kris',
          last_name: 'Evans'
        }
      ]);
    });
};
