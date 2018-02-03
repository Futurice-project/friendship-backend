const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
const moment = require('moment');



const eventFields = {
  createdAt: moment(),
  description: faker.lorem.sentences,
  location: faker.lorem.sentences,
  eventDate: moment()
};
exports.seed = knex =>
  knex.batchInsert(
    'events',
    simpleFixtures.generateFixtures(eventFields, 8),
  );
