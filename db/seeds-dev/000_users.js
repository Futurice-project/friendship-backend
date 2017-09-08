const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

const emojis = [
  '👀','💋','🐶','🦋','😹'
];

const userFields = {
  email: faker.internet.email,
  description: faker.lorem.sentences,
  firstname: faker.name.firstName,
  lastname: faker.name.lastName,
  username: faker.internet.userName,
  emoji: () => emojis[Math.floor(Math.random() * emojis.length)],
  scope: 'user',
};

// 'foobar'
const dummyPassword = '$2a$10$jqtfUwulMw6xqGUA.IsjkuAooNkAjPT3FJ9rRiUoSTsUpNTD8McxC';

exports.seed = knex => (
  knex('users')
    // Generate one test admin user
    .insert({
      ...simpleFixtures.generateFixture(userFields),

      email: 'foo@bar.com',
      scope: 'admin',
    }, 'id')
    .then(ids => ids[0]) // Return first (only) user id

    // Set admin user password to 'foobar'
    .then(ownerId => knex('secrets').insert({
      ownerId,
      password: dummyPassword,
    }))

    // Generate several test users (no password = login disabled)
    .then(() => knex.batchInsert('users', simpleFixtures.generateFixtures(userFields, 10)))
);
