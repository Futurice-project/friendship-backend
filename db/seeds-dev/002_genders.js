const simpleFixtures = require('simple-fixtures');

const genders = ['male', 'female', 'unicorn', 'not specified'];
let count = -1;

const genderFields = {
  gender: () => {
    count += 1;
    return genders[count];
  },
};

exports.seed = knex =>
  knex.batchInsert(
    'genders',
    simpleFixtures.generateFixtures(genderFields, genders.length),
  );
  // .insert({
  //   ...simpleFixtures.generateFixture(userFields),
  //   active: true,
  //   email: 'foo@bar.com',
  //   scope: 'admin',
  // },
  //   'id',
  // )
  // .then(ids => ids[0]) // Return first (only) user id
  // // Set admin user password to 'foobar'
  // .then(ownerId =>
  //   knex('secrets').insert({
  //     ownerId,
  //     password: dummyPassword,
  //   }),
  // )
  // // Generate several test users (no password = login disabled)
  // .then(() =>
  //   knex.batchInsert(
  //     'users',
  //     simpleFixtures.generateFixtures(userFields, 10),
  //   ),
  // );
