
exports.up = function(knex, Promise) {
  return knex.schema
    /**
     * Banned Users table
     *
     * Contains info on all banned users in the system
     */
    .createTableIfNotExists('banned_users', (table) => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('banned_by').references('id').inTable('users').onDelete('SET NULL');
      table.timestamp('expire').defaultTo(null);
      table.text('reason').notNullable();
    });
}

exports.down = (knex) =>
  knex.schema.dropTableIfExists('banned_users');
