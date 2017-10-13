const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
// yarn db:init yes
const chatroomFields = {
  userCreatorId: () => faker.random.number({ min: 1, max: 51 }),
  userReceiverId: () => faker.random.number({ min: 1, max: 51 }),
};

exports.seed = knex =>
knex('chatrooms')
  .then(() =>
  knex('messages').select()
  )
  .then(() =>
    knex.batchInsert(
      'chatrooms',
      simpleFixtures.generateFixtures(chatroomFields, 25),
    ),
  );
