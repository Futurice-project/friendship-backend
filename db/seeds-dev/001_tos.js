const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const tosFields = {
    tos_text: faker.lorem.sentences,
};


exports.seed = knex =>
knex
  // Generate one test admin user
  .batchInsert(
      'terms_of_service',
      simpleFixtures.generateFixtures(tosFields, 10),
  );