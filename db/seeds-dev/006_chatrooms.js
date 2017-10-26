const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
// yarn db:init yes
const chatroomFields = {
  user_creator_id: () => faker.random.number({ min: 1, max: 51 }),
  user_receiver_id: () => faker.random.number({ min: 1, max: 51 }),

  //userCreatorName: () =>
};

exports.seed = knex =>
knex('chatrooms')
// to get ms to post route
  .then(() =>
  knex('messages').select()
  )
  .then(() =>
    knex.batchInsert(
      'chatrooms',
      simpleFixtures.generateFixtures(chatroomFields, 25),
    ),
  );