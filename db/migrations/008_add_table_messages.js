/**
 * Add table for messages
 */
exports.up = knex => (
    knex.schema
      .createTableIfNotExists('messages', (table) => {
        table.increments('id').unique().primary();
        table.text('text_message').notNullable();
        table.timestamp('chat_time');
        table.integer('user_id').references('id').inTable('users');
        table.integer('chatroom_id').references('id').inTable('chatrooms');
      })
  );

  /**
   * Delete the tags table
   */
exports.down = knex => (
    knex.schema
      .table.dropTableIfExists('messages')
  );
