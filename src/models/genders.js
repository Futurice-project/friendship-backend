import knex from '../utils/db';

const genderFields = ['id', 'gender'];
const userGendersField = ['userId', 'gender'];

export const dbGetGenders = () =>
  knex('genders').select(genderFields);

export const dbGetGender = id =>
  knex('genders')
    .first()
    .where({ id });

// export const dbGetUserGenders = userId =>
//   knex('user_gender')
//     .select(userGenderFields)
//     .where({ userId });

export const dbGetUserGenders = userId =>
  knex('user_gender')
    .select(userGendersField)
    .join('genders', 'user_gender.genderId', '=', 'genders.id')
    .where({ userId });

export const dbCreateUserGender = () =>
  knex.transaction(trx =>
    knex('user_gender')
      .transacting(trx)
      .returning('*')
      .then(results => results[0]),
  );

export const dbDelUserGender = (userId, genderId) =>
  knex('user_gender')
    .where({ userId, genderId })
    .del();
