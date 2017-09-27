const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const tagFields = {
  name: () => faker.company.catchPhraseNoun() + faker.random.number({ min: 1, max: 999 }),
  category: () => faker.random.number({ min: 1, max: 5 }),
};

let userId = 1;
let tagId = 0;

const usertagFields = {
  userId: () => {
    if (tagId === 10) {
      userId += 1;
      tagId = 0;
    }
    return userId;
  },
  tagId: () => {
    tagId += 1;
    return tagId;
  },
  love: () => faker.random.number({ min: 0, max: 1 }),
};

exports.seed = knex =>
  knex.batchInsert(
    'tags',
    simpleFixtures.generateFixtures(tagFields, 10),
  )
  .then(() =>
  knex.batchInsert(
    'user_tag',
    simpleFixtures.generateFixtures(usertagFields, 100),
  ),
);
