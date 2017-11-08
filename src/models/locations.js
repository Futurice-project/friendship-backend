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

export const dbCreateUserLocations = (locationArray) => {
  // knex.transaction(async (trx) => {
    console.log(locationArray);
    // console.log('UserID:', userId);
    // await trx('user_location')
    //   .where({ userId })
    //   .del()
    //   .then(results => results);
    // await trx('user_location')
  //   .where({ userId })
  knex('user_location')
    .insert(locationArray)
    .returning('*')
    .then(results => {
      console.log(results);
      return results[0];
    })
    .catch(err => err);
};

