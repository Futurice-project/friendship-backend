exports.up = knex =>
  knex.schema
    /**
     * Events table
     *
     * Contains info on all events in the system
     */
    .createTableIfNotExists('events', (table) => {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.text('description');
      table.text('location');
      table.timestamp('eventDate');
    })
  exports.down = knex => knex.schema.dropTableIfExists('events');
