/**
 * Add table for topics
 * And create tabe user_topic (allows a many to many relation)
 * Can be used to send the hash trough e-mail to the user
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('topics', (table) => {
      table.increments('id').primary();
      table
        .text('name').unique();
    })

    .createTableIfNotExists('user_topic', (table) => {
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('topicId').unsigned().references('id').inTable('topics');
      table.boolean('love');
      table.primary(['userId', 'topicId']);
    })
);

/**
 * Delete the topics table
 */
exports.down = knex => (
  knex.schema
    .table.dropTableIfExists('topics')
    .table.dropTableIfExists('user_topic')
);
