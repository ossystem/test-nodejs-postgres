exports.up = knex => knex.raw('ALTER TABLE users ADD COLUMN id BIGSERIAL PRIMARY KEY;');

exports.down = knex => {
  return knex.schema.table("users", table => {
    table.dropPrimary();
  });
};
