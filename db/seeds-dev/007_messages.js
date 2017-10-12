const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
const moment = require('moment');

const messageFields = {
  textMessage: () => faker.lorem.sentences,
  chatTime: moment(),
};
exports.seed = knex =>
knex('messages')
  .then(() =>
    knex.batchInsert(
      'messages',
      simpleFixtures.generateFixtures(messageFields, 50),
    ),
  );
