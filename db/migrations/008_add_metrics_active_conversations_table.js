exports.up = knex =>
    knex.schema
        .createTableIfNotExists('metrics_active_conversations', (table) => {
            table.increments('id').primary();
            table.integer('conversations_count');
            table.timestamp('timestamp');
        });

exports.down = knex =>
    knex.schema
        .table.dropTableIfExists('metrics_active_conversations');