exports.up = knex => (
    knex.schema
      .createTableIfNotExists('chatrooms', (table) => {
        table.increments('id').primary();
        table.integer('user_creator_id').references('id').inTable('users');
        table.integer('user_receiver_id').references('id').inTable('users');
        //table.text('userCreatorName').references('username').inTable('users');
        //table.text('userReceiverName').references('username').inTable('users');
        //table.text('messages');
      })
  );
exports.down = knex => (
    knex.schema
        .table.dropTableIfExists('chatrooms')
  );
