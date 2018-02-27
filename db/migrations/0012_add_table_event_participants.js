/**
 * Add table for events participants
 * And link it to the user
 * And link it to the event
 */
exports.up = knex =>
  knex.schema.createTableIfNotExists('eventParticipants', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('eventId')
      .references('id')
      .inTable('events')
      .onDelete('CASCADE');
    table.timestamp('createdAt').notNullable();
  });

exports.down = knex => knex.schema.table.dropTableIfExists('eventParticipants');
