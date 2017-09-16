const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const personalityFields = {
  name: faker.company.bsAdjective,
};

const random10 = () => Math.floor(Math.random() * 10) + 1;
const random5 = () => Math.floor(Math.random() * 5) + 1;

const userPersonalityFields = {
  userId: random10,
  personalityId: random10,
  level: random5,
};

exports.seed = knex =>
  knex.batchInsert(
    'personalities',
    simpleFixtures.generateFixtures(personalityFields, 10),
  ).then(() =>
    knex.batchInsert(
      'user_personality',
      simpleFixtures.generateFixtures(userPersonalityFields, 30),
    ),
  );
