import knex from '../utils/db';

const locationFields = ['id', 'name'];
const userLocationFields = ['userId', 'locationId'];

export const dbGetLocations = () => knex('locations').select(locationFields);

export const dbDelLocation = id =>
  knex('locations')
    .where({ id })
    .del();

export const dbAddLocation = ({ ...fields }) =>
  knex('locations')
    .insert(fields)
    .returning('*')
    .then(results => results[0]);

export const dbGetUserLocations = userId =>
  knex('user_location')
    .select(userLocationFields)
    .where({ userId });

export const dbDelUserLocation = userId =>
  knex('user_location')
    .where({ userId })
    .del();

export const dbCreateUserLocations = (userId, locationArray) =>
  knex.transaction(async (trx) => {
    await trx('user_location')
      .where({ userId })
      .returning('*')
      .del()
      .then();

    const userLocations = await trx('user_location')
      .insert(locationArray)
      .returning('*')
      .then(results => results);

    return userLocations;
  });
