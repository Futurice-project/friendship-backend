import knex from '../utils/db';

const userListFields = ['id', 'email', 'username', 'description', 'emoji', 'compatibility'];

export const dbGetUsers = () => knex('users').select(userListFields);

export const dbGetUser = id =>
  knex('users')
    .first()
    .where({ id });

export const dbGetUserByUsername = username =>
  knex('users')
    .where({ username });

export const dbUpdateUser = (id, fields) =>
  knex('users')
    .update({ ...fields })
    .where({ id })
    .returning('*');

export const dbDelUser = id =>
  knex('users')
    .where({ id })
    .del();

export const dbCreateUser = ({ password, ...fields }) =>
  knex.transaction(async trx => {
    const user = await trx('users')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    await trx('secrets').insert({
      ownerId: user.id,
      password,
    });

    return user;
  });
