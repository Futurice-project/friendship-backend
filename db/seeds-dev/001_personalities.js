const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const personalityFields = {
  name: () => faker.company.bsAdjective() + faker.random.number({ min: 1, max: 99 }),
};

const userPersonalityFields = {
  userId: () => faker.random.number({ min: 1, max: 10 }),
  personalityId: () => faker.random.number({ min: 1, max: 10 }),
  level: () => faker.random.number({ min: 1, max: 5 }),
};

exports.seed = knex =>
  knex.batchInsert(
    'personalities',
    simpleFixtures.generateFixtures(personalityFields, 10),
  )
  // not working at the moment due to PK constraint (faker cannot generate unique composite PK)
  // .then(() =>
  //   knex.batchInsert(
  //     'user_personality',
  //     simpleFixtures.generateFixtures(userPersonalityFields, 10),
  //   ),
  // );
