/**
 * Add table for reports
 * And link it to a user
 */
exports.up = knex =>
knex.schema
  .createTableIfNotExists('reports', (table) => {
    table.increments('id').primary();
    table.integer('userId').references('id').inTable('users').onDelete('CASCADE');
    table.text('description').notNullable().unique();
    table.timestamp('createdAt').notNullable();
    table.integer('reported_by').references('id').inTable('users').onDelete('SET NULL');
  })


exports.down = knex =>
knex.schema
  .table.dropTableIfExists('reports');
