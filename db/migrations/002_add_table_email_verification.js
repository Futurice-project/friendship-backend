/**
 * Add email verification table
 * Can be used to send the hash trough e-mail to the user
 */
exports.up = knex => (
  knex.schema
    .createTableIfNotExists('email_verification', table => {
        table
            .integer('owner_id')
            .references('id')
            .inTable('users')
            .primary();
        table.text('hash').notNullable();
    })
);


/**
 * Delete the email verification table
 */
exports.down = knex => (
  knex.schema
      .table.dropTableIfExists('email_verification')
);
