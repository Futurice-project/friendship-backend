const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
const moment = require('moment');

const eventFields = {
  createdAt: moment(),
  title: faker.lorem.word,
  description: faker.lorem.sentences,
  city: faker.address.city,
  address: faker.address.streetAddress,
  eventDate: moment(),
};
exports.seed = knex =>
  knex.batchInsert('events', simpleFixtures.generateFixtures(eventFields, 8));
