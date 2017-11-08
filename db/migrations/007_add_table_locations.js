/**
 * Add table for locations
 * And create tabe user-locations (allows a many to many relation)
 */
exports.up = knex =>
  knex.schema
    .createTableIfNotExists('locations', (table) => {
      table.increments('id').primary();
      table.text('name').notNullable().unique();
    })
    .createTableIfNotExists('user_location', (table) => {
      table
          .integer('userId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
      table
          .integer('locationId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('locations')
          .onDelete('CASCADE');
      table.primary(['userId', 'locationId']);
    });

exports.down = knex =>
knex.schema
  .table.dropTableIfExists('locations')
  .table.dropTableIfExists('user_location');
