/**
 * Add table for personalities
 * And create tabe user-personalities (allows a many to many relation)
 * Add constrant levelCheck for level (only allows 1-5)
 */
exports.up = knex =>
  knex.schema
    .createTableIfNotExists('personalities', (table) => {
      table.increments('id').primary();
      table.text('name').notNullable();
    })
    .createTableIfNotExists('user-personality', (table) => {
      table.increments('id').primary();
      table
          .integer('userId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users');
      table
          .integer('personalityId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('personalities');
      // check constraint for level?? raw query?
      table.integer('level').notNullable();
    }).then(() =>
      knex.raw('ALTER TABLE "user-personality" ADD constraint levelCheck CHECK (level > 0 AND level < 6)'));

exports.down = knex =>
  knex.schema
    .table.dropTableIfExists('topics')
    .table.dropTableIfExists('user-topic');
