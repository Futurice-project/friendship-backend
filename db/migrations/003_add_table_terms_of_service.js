/**
 * Add terms of service table
 * Keeps a history of all updates
 */
exports.up = knex => (
    knex.schema
      .createTableIfNotExists('terms_of_service', table => {
          table.increments('id').primary();
          table.text('tos_text').notNullable();
          table.timestamp('createdAt').notNullable();
      })
  );
  
  
  /**
   * Delete the terms of service table
   */
  exports.down = knex => (
    knex.schema
        .table.dropTableIfExists('terms_of_service')
  );