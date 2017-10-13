/**
 * Add table for messages
 */
exports.up = knex => (
    knex.schema
      .createTableIfNotExists('messages', (table) => {
        table.increments('id').unique().primary();
        table.text('textMessage');
        table.timestamp('chatTime');
        table.integer('userId').references('id').inTable('users');
        table.integer('chatroomId').references('id').inTable('chatrooms');
      })
  );
  /**
   * Delete the tags table
   */
exports.down = knex => (
    knex.schema
      .table.dropTableIfExists('messages')
  );
