const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const personalityFields = {
  name: () => faker.company.bsAdjective() + faker.random.number({ min: 1, max: 99 }),
};

let userId = 1;
let personalityId = 0;

const userPersonalityFields = {
  userId: () => {
    if (personalityId === 10) {
      userId += 1;
      personalityId = 0;
    }
    return userId;
  },
  personalityId: () => {
    personalityId += 1;
    return personalityId;
  },
  level: () => faker.random.number({ min: 1, max: 5 }),
};

exports.seed = knex =>
  knex.batchInsert(
    'personalities',
    simpleFixtures.generateFixtures(personalityFields, 10),
  )
  .then(() =>
    knex.batchInsert(
      'user_personality',
      simpleFixtures.generateFixtures(userPersonalityFields, 100),
    ),
  );
