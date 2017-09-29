/**
 * Add table for reports
 * And link it to a user
 */
exports.up = knex =>
knex.schema
  .createTableIfNotExists('reports', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable().unique();
    table.timestamp('createdAt').notNullable();
  })


exports.down = knex =>
knex.schema
  .table.dropTableIfExists('personalities');
