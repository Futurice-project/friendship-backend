const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
const moment = require('moment');

const reportFields = {
  user_id: 1,
  createdAt: moment(),
  description: faker.lorem.sentences,
  reported_by: faker.random.number({ min: 1, max: 5 }),
};


exports.seed = knex =>
knex.batchInsert(
  'reports',
  simpleFixtures.generateFixtures(reportFields, 10),
);
