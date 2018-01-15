/* eslint-disable no-console */

import prompt from 'prompt';

import config from '../src/utils/config';
import knex from 'knex';

const schema = {
  properties: {
    confirmation: {
      required: true,
    },
  },
};

console.log('WARNING! This will wipe the database at:');
console.log(config.db.development);
console.log('Are you sure? (y/n)');
prompt.start();

prompt.get(schema, async (err, result) => {
  if (err) {
    process.exit(1);
  }

  if (result.confirmation !== 'y') {
    console.log('Quitting.');
    process.exit(1);
  }

  const no_db_config = JSON.parse(JSON.stringify(config.db.development)); // legit deep-clone method
  no_db_config.connection.database = 'postgres'; // seems to be the default DB name

  const knex_no_db = knex(no_db_config);
  const knex_connect_db = knex(config.db.development);

  // Create the DB
  try {
    await knex_no_db.raw(`CREATE DATABASE ${config.db.development.connection.database};`)
  } catch(e) {
    // Ignore errors here, most likely DB existed :-)
  }

  await knex_connect_db.raw('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');

  console.log('Successfully wiped database.');
  process.exit(0);
});
