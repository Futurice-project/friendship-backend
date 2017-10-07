exports.up = knex => (
    knex.schema
      .createTableIfNotExists('chatrooms', (table) => {
        table.increments('id').primary();
        table.integer('userCreatorId').references('id').inTable('users');
        table.integer('userReceiverId').references('id').inTable('users');
      })
  );
exports.down = knex => (
    knex.schema
        .table.dropTableIfExists('chatrooms')
  );
