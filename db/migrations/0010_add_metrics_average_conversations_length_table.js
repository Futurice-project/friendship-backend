exports.up = knex =>
    knex.schema
        .createTableIfNotExists('metrics_conversations_length', (table) => {
            table.increments('id').primary();
            table.integer('conversations_length');
            table.timestamp('timestamp');
        });

exports.down = knex =>
    knex.schema
        .table.dropTableIfExists('metrics_conversations_length');