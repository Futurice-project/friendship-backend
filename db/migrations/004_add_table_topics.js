/**
 * Add table for topics
 * And create tabe user-topic (allows a many to many relation)
 * Can be used to send the hash trough e-mail to the user
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('topics', (table) => {
      table.increments('id').primary;
      table
        .text('name');
    })

    .createTableIfNotExists('user-topic', (table) => {
      table.increments().primary;
      table.boolean('love');
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('topicId').unsigned().references('id').inTable('topics');
    })
);

/**
 * Delete the topics table
 */
exports.down = knex => (
  knex.schema
    .table.dropTableIfExists('topics')
    .table.dropTableIfExists('user-topic')
);
