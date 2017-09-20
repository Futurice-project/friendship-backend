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
