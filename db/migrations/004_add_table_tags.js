/**
 * Add table for tags
 * And create tabe user_tag (allows a many to many relation)
 * Can be used to send the hash trough e-mail to the user
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('tags', (table) => {
      table.increments('id').primary();
      table
        .text('name').unique();
      table.integer('category');
    })

    .createTableIfNotExists('user_tag', (table) => {
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('tagId').unsigned().references('id').inTable('tags');
      table.boolean('love');
      table.primary(['userId', 'tagId']);
    })
);

/**
 * Delete the tags table
 */
exports.down = knex => (
  knex.schema
    .table.dropTableIfExists('tags')
    .table.dropTableIfExists('user_tag')
);
