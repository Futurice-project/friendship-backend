/**
 * Add genders table
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('genders', (table) => {
      table.increments('id').primary();
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
