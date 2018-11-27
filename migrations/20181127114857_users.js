exports.up = knex => knex.raw(`SELECT setval('users_id_seq', 3, FALSE);`);
exports.down = knex => knex.raw(``);
