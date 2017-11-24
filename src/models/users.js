import knex from '../utils/db';
import { sendVerificationEmail } from '../utils/email';

const crypto = require('crypto');

const userListFields = [
  'users.id',
  'createdAt',
  'email',
  'scope',
  'username',
  'description',
  'emoji',
  'compatibility',
  'active',
  'status',
  'image',
];
//  .tostring('base64') db model

const pageLimit = 10;

export const dbGetUsers = () =>
  knex('users')
    .leftJoin('banned_users', 'banned_users.user_id', 'users.id')
    .select(userListFields)
    .count('banned_users.id as isbanned')
    .groupBy('users.id')
    .orderBy('users.id', 'asc');

export const dbGetFilteredUsers = filter =>
  knex('users')
    .where('username', 'like', `%${filter.username}%`)
    .orWhere('email', 'like', `%${filter.email}%`)
    .select(userListFields)
    .orderBy('id', 'asc');

export const dbGetUsersBatch = (pageNumber, userId) =>
  knex('users')
    .select(userListFields)
    .limit(pageLimit)
    .offset(pageNumber * pageLimit)
    .where('id', '!=', userId);

export const dbGetEmailVerification = hash =>
  knex('email_verification')
    .first()
    .where({ hash });

export const dbGetUser = async (id) => {
  const user = await knex('users')
    .leftJoin('banned_users', 'banned_users.user_id', 'users.id')
    .select(userListFields)
    .count('banned_users.id as isbanned')
    .groupBy('users.id')
    .first()
    .where('users.id', '=', id);

  // we convert the image in base 64 so we can display it in our app
  user.image = user.image.toString('base64');

  return user;
};

export const dbUpdatePassword = (id, hash) =>
  knex('secrets')
    .update({ password: hash })
    .where({ ownerId: id });

// export const dbGetUserWithContent = userId =>
//   knex('tags')
//     .leftJoin('user_tag', 'user_tag.tagId', 'tags.id')
//     .where({ 'user_tag.userId': userId });

export const dbGetUserByUsername = (username, userId) =>
  knex('users')
    .where('id', '!=', userId)
    .andWhere('username', 'like', `%${username}%`);

export const dbUpdateUser = (id, fields) =>
  knex('users')
    .update({ ...fields })
    .where({ id })
    .returning('*');

export const dbFetchUserBan = id => knex('banned_users').where('user_id', '=', id);

export const dbBanUser = (id, fields) => {
  fields = {
    ...fields,
    user_id: id,
  };

  return knex('banned_users')
    .returning('*')
    .insert(fields);
};

export const dbDelUser = id =>
  knex('users')
    .where({ id })
    .del();

export const dbDelVerificationHash = ownerId =>
  knex('email_verification')
    .where({ ownerId })
    .del();

export const dbCreateUser = ({ password, genders, ...fields }) =>
  knex.transaction(async (trx) => {
    const user = await trx('users')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    await trx('secrets')
      .insert({
        ownerId: user.id,
        password,
      })
      .then();

    const genderArray = [];
    if (genders) {
      genders.forEach((gender) => {
        genderArray.push({ userId: user.id, genderId: gender });
      });
    }

    await trx('user_gender')
      .insert(genderArray)
      .then();

    // console.log('Creating Hash');
    const hash = crypto.randomBytes(48).toString('hex');

    await trx('email_verification')
      .insert({
        ownerId: user.id,
        hash,
      })
      .then();

    // console.log('Sending Hash Email now to', user.email);
    // activate this here later
    // sendVerificationEmail(hash, user.email);

    return user;
  });
