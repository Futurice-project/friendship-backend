/* eslint-disable import/no-extraneous-dependencies */

import knex from 'knex';
import mockKnex from 'mock-knex';

const db = knex({
  client: 'pg',
});

mockKnex.mock(db);

export default db;
