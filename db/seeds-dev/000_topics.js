const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const topicFields = {
  name: () => faker.company.catchPhraseNoun() + faker.random.number({ min: 1, max: 99 }),
};

exports.seed = knex =>
  knex.batchInsert(
    'topics',
    simpleFixtures.generateFixtures(topicFields, 10),
  );
