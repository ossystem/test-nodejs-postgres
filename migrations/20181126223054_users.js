exports.up = knex => {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("email").notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.unique("email");
    table.timestamps(true, true);

    table.index([
      "email"
    ]);
  });
};

exports.down = knex => knex.schema.dropTable("users");