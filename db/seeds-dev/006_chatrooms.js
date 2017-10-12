const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
// yarn db:init yes
const chatroomFields = {
  userCreatorId: () => faker.random.number(51),
  userReceiverId: () => faker.random.number(51),
};


exports.seed = knex =>
knex('chatrooms')
  .then(() =>
    knex.batchInsert(
      'chatrooms',
      simpleFixtures.generateFixtures(chatroomFields, 25),
    ),
  );
