exports.up = knex => {
  return knex.schema.table("users", table => {
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

exports.down = knex => {
  return knex.schema.table("users", table => {
    table.dropColumn("email");
    table.dropColumn("first_name");
    table.dropColumn("last_name");
    table.dropTimestamps();
  });
};
