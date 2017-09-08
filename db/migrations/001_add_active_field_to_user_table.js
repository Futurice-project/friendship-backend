/**
 * Add active field to the users table
 */
exports.up = knex => (
  knex.schema
    .table('users', function (table){
          table.boolean('active').defaultTo(false)
    })
);


/**
 * Delete the active field from the users table
 */
exports.down = knex => (
  knex.schema
      .table.dropColumn('active')
);
