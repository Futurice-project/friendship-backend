exports.up = knex =>
    knex.schema
        .createTableIfNotExists('metrics_users_registered', (table) => {
            table.increments('id').primary();
            table.timestamp('timestamp');
            table.integer('users_count');
            table.integer('registered_today');
        });

exports.down = knex =>
    knex.schema
        .table.dropTableIfExists('metrics_users_registered');