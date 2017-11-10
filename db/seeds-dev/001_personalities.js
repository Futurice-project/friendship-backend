const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

// Designer decided to have a preset list
// Using this for the seed data as well
let personalities = ["relaxed", "ambitious", "traditional", "open-minded", "religion", "free thinker", "going out", "chilling out"];
let index = 0;

const personalityFields = {
    name: () => {
      console.log(personalities)
      console.log('index' + index)
      return personalities[index++];
    },
};

let userId = 1;
let personalityId = 0;

const userPersonalityFields = {
  userId: () => {
    if (personalityId === 8) {
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
    simpleFixtures.generateFixtures(personalityFields, 8),
  )
  .then(() =>
    knex.batchInsert(
      'user_personality',
      simpleFixtures.generateFixtures(userPersonalityFields, 100),
    ),
  );
