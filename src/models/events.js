import knex from '../utils/db';

const eventFields = [
  'id',
  'createdAt',
  'title',
  'eventImage',
  'description',
  'location',
  'eventDate',
];

export const dbGetEvents = () => knex('events').select(eventFields);

export const dbGetEvent = id =>
  knex('events')
    .first()
    .where({ id });

export const dbCreateEvent = ({ ...fields }) =>
  knex.transaction(async trx => {
    const report = await trx('events')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return report;
  });

export const dbDelEvent = id =>
  knex('events')
    .where({ id })
    .del();

export const dbUpdateEvent = (id, fields) =>
  knex('events')
    .update({ ...fields })
    .where({ id })
    .returning('*');
