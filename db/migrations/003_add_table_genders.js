/**
 * Add genders table
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('genders', (table) => {
      table
            .integer('ownerId')
            .references('id')
            .inTable('users')
            .primary();
      table.text('gender').notNullable();
    })
);


/**
 * Delete the genders table
 */
exports.down = knex => (
  knex.schema
      .table.dropTableIfExists('genders')
);
