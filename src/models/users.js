import knex from '../utils/db';
import { sendVerificationEmail } from '../utils/email';

const crypto = require('crypto');

const userListFields = ['id', 'createdAt', 'email', 'scope', 'username', 'description', 'emoji', 'compatibility', 'active', 'status'];
const pageLimit = 10;

export const dbGetUsers = () =>
  knex('users')
    .select(userListFields)
    .orderBy('id', 'asc');

export const dbGetFilteredUsers = (filter) => {
  return knex('users')
    .where('username', 'like', '%' + filter.username + '%')
    .orWhere('email', 'like', '%' + filter.email + '%')
    .select(userListFields)
    .orderBy('id', 'asc');
}

export const dbGetUsersBatch = pageNumber =>
  knex('users')
    .select(userListFields)
    .limit(pageLimit)
    .offset(pageNumber * pageLimit);

export const dbGetEmailVerification = hash =>
  knex('email_verification')
    .first()
    .where({ hash });

export const dbGetUser = id =>
  knex('users')
    .first()
    .where({ id });

// export const dbGetUserWithContent = userId =>
//   knex('tags')
//     .leftJoin('user_tag', 'user_tag.tagId', 'tags.id')
//     .where({ 'user_tag.userId': userId });

export const dbGetUserByUsername = username =>
  knex('users').where('username', 'like', `%${username}%`);

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

export const dbCreateUser = ({ password, ...fields }) =>
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

    // console.log('Creating Hash');
    const hash = crypto.randomBytes(48).toString('hex');

    await trx('email_verification')
      .insert({
        ownerId: user.id,
        hash,
      })
      .then(() => console.log(hash));

    // console.log('Sending Hash Email now to', user.email);
    sendVerificationEmail(hash, user.email);

    return user;
  });
