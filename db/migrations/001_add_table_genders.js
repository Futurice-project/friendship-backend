/**
 * Add genders table
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('genders', (table) => {
      table.increments('id').primary();
      table.text('gender').notNullable();
    })
    .createTableIfNotExists('user_gender', (table) => {
      table
          .integer('userId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
      table
        .integer('genderId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('genders')
        .onDelete('CASCADE');
      table.primary(['userId', 'genderId']);
    })
);

/**
 * Delete the genders table
 */
exports.down = knex => (
  knex.schema
      .table.dropTableIfExists('genders')
      .table.dropTableIfExists('user_gender')
);
