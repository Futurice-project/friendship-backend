const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const chatroomFields = {
  //userCreatorId: faker.random.number,
  //userReceiverId: faker.random.number,
};
exports.seed = knex =>
knex('chatrooms')
  .then(() =>
    knex.batchInsert(
      'chatrooms',
      simpleFixtures.generateFixtures(chatroomFields, 50),
    ),
  );
