/**
 * Add table for messages
 */
exports.up = knex => (
    knex.schema
      .createTableIfNotExists('messages', (table) => {
        table.increments('id').unique().primary();
        table.text('textMessage');
        table.date('chatTime');
        table.integer('userId').references('id').inTable('users').unique();
        table.integer('chatroomId').unsigned().references('id').inTable('chatrooms');
      })
  );
  /**
   * Delete the tags table
   */
exports.down = knex => (
    knex.schema
      .table.dropTableIfExists('messages')
  );
