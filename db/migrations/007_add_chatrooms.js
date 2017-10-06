exports.up = knex => (
    knex.schema
      .createTableIfNotExists('chatrooms', (table) => {
        table.increments('id').primary();
        table.text('description').notNullable();
      })
  );
exports.down = knex => (
    knex.schema
        .table.dropTableIfExists('chatrooms')
  );
