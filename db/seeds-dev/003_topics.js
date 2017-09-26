const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const topicFields = {
  name: () => faker.company.catchPhraseNoun() + faker.random.number({ min: 1, max: 999 }),
  category: () => faker.random.number({ min: 1, max: 5 }),
};

let userId = 1;
let topicId = 0;

const userTopicFields = {
  userId: () => {
    if (topicId === 10) {
      userId += 1;
      topicId = 0;
    }
    return userId;
  },
  topicId: () => {
    topicId += 1;
    return topicId;
  },
  love: () => faker.random.number({ min: 0, max: 1 }),
};

exports.seed = knex =>
  knex.batchInsert(
    'topics',
    simpleFixtures.generateFixtures(topicFields, 10),
  )
  .then(() =>
  knex.batchInsert(
    'user_topic',
    simpleFixtures.generateFixtures(userTopicFields, 100),
  ),
);
