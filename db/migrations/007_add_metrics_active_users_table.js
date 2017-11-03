exports.up = knex =>
    knex.schema
        .createTableIfNotExists('metrics_active_users', (table) => {
            table.increments('id').primary();
            table.integer('users_count');
            table.timestamp('timestamp');
        });

exports.down = knex =>
    knex.schema
        .table.dropTableIfExists('metrics_active_users');