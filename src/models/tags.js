import knex from '../utils/db';

const tagListFields = ['id', 'name'];
const userTagListFields = ['userId', 'tagId', 'love'];

export const dbGetTags = () => knex('tags').select(tagListFields);

export const dbGetTag = id =>
  knex('tags')
    .first()
    .where({ id });

export const dbCreateTag = ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const tag = await trx('tags')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return tag;
  });

export const dbDelTag = id =>
  knex('tags')
    .where({ id })
    .del();

export const dbUpdateTag = (id, fields) =>
  knex('tags')
    .update({ ...fields })
    .where({ id })
    .returning('*');


//  Get all tags that a user has chosen to be either loved or hated
export const dbGetUserTags = userId =>
  knex('user_tag')
    .select(userTagListFields)
    .where({ userId });

// Add a new tag that a user loves/hates
export const dbCreateUserTag = ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const tag = await trx('user_tag')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return tag;
  });


//  Delete a user_tag
export const dbDelUserTag = (userId, tagId) =>
  knex('user_tag')
    .where({ userId, tagId })
    .del();
