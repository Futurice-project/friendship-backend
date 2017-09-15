/**
 * Add table for personalities
 * And create tabe user-personalities (allows a many to many relation)
 */
exports.up = knex =>
  knex.schema
    .createTableIfNotExists('personalities', (table) => {
      table.increments('id').primary();
      table.text('name');
    })
    .createTableIfNotExists('user-personality', (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users');
      table.integer('personalityId').unsigned().references('id').inTable('personalities');
      // check constraint for level?? raw query?
      table.integer('level').unsigned();
    });

// add check constraint later
// exports.up = knex =>
//   knex.raw('ALTER TABLE "user-personality" ADD constraint levelCheck CHECK (level > 0 AND level < 6)');

exports.down = knex =>
  knex.schema
    .table.dropTableIfExists('topics')
    .table.dropTableIfExists('user-topic');
