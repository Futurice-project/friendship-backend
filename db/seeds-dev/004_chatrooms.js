const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const chatroomFields = {
  userCreatorId: faker.intenet.userName,
  //userReceiver: `${faker.internet.userName}_01`,
};


exports.seed = knex =>
knex
  // Generate one test admin user
  .batchInsert(
      'chatrooms',
      simpleFixtures.generateFixtures(chatroomFields, 10),
  );
