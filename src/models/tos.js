import knex from '../utils/db';

const tosFields = ['id', 'tos_text', 'createdAt'];

export const dbGetAllTos = () => knex('terms_of_service').select(tosFields);

export const dbGetTos = id =>
  knex('terms_of_service')
    .first()
    .where({ id });

export const dbGetLatestTos = () => 
    knex('terms_of_service')
    .first(tosFields)
    .orderBy('createdAt', 'desc');

export const dbCreateTos = ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const tos = await trx('terms_of_service')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return tos;
  });

// not acually needed, we want a history of terms of services,
// changes = new db entry
/*

export const dbDelTos = id =>
  knex('terms_of_service')
    .where({ id })
    .del();

export const dbUpdateTos = (id, fields) =>
  knex('terms_of_service')
    .update({ ...fields })
    .where({ id })
    .returning('*');
*/
