const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const genders = ['male', 'female', 'human', 'other'];
let count = -1;

const genderFields = {
  gender: () => {
    count += 1;
    return genders[count];
  },
};

let userId = 0;
let m = 1;

const userGenderFields = {
  userId: () => {
    if (userId === 51) {
      userId = 0;
      m = 2;
    }
    if (m > 1) {
      const k = faker.random.number({ min: 0, max: 1 });
      if (k === 1) {
        userId += 1;
      }
    }
    userId += 1;
    return userId;
  },
  genderId: () => {
    if (m > 1) {
      return faker.random.number({ min: 3, max: 4 });
    }
    return faker.random.number({ min: 1, max: 2 });
  },
};

exports.seed = knex =>
  knex.batchInsert(
    'genders',
    simpleFixtures.generateFixtures(genderFields, genders.length),
  )
  .then(() =>
  knex.batchInsert(
      'user_gender',
      simpleFixtures.generateFixtures(userGenderFields, 80),
  ),
);
