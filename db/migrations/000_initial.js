exports.up = knex =>
  knex.schema
    /**
     * Users table
     *
     * Contains info on all users in the system
     */
    .createTableIfNotExists('users', (table) => {
      table.increments('id').primary();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.enum('scope', ['admin', 'user']).notNullable();
      table
        .text('email')
        .notNullable()
        .unique();
        /**
         * 0 = deactivated
         * 1 = activated
         * 2 = banned
         */
      table.integer('active').defaultTo(0);
      table
        .integer('gender')
        .references('id')
        .inTable('genders');
      table.text('description');
      table.text('username');
      table.text('emoji'); // @TODO: This should be a binary image called 'mood', create a table 'emojis' for this later and make a reference
      table.binary('image');
      table.text('compatibility');
      table.text('location');
      table.boolean('enableMatching');
      table.date('birthday');
    })
    /**
     * Define a separate table for storing user secrets (such as password hashes).
     *
     * The rationale is:
     *   - Have to explicitly join/query password table to access secrets
     *   - Don't have to filter out secrets in every 'users' table query
     *
     * => Harder to accidentally leak out user secrets
     *
     * You may want to store other user secrets in this table as well.
     */
    .createTableIfNotExists('secrets', (table) => {
      table
        .integer('ownerId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .primary();
      table.text('password').notNullable();
    });

exports.down = knex => knex.schema.dropTableIfExists('users').dropTableIfExists('secrets');
