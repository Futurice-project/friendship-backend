exports.up = knex => (
    knex.schema
      .createTableIfNotExists('chatrooms', (table) => {
        table.increments('id').primary();
        table.integer('userCreatorId').references('id').inTable('users');
        table.integer('userReceiverId').references('id').inTable('users');
        //table.text('userCreatorName').references('username').inTable('users');
        //table.text('userReceiverName').references('username').inTable('users');
        //table.text('messages');
      })
  );
exports.down = knex => (
    knex.schema
        .table.dropTableIfExists('chatrooms')
  );
