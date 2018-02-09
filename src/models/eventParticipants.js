import knex from '../utils/db';

const eventParticipantFields = ['id', 'createdAt', 'userId', 'eventId'];

export const dbGetEventParticipants = eventId =>
  knex('eventParticipants')
    .select(eventParticipantFields)
    .where({ eventId });

export const dbCreateEventParticipation = ({ ...fields }) =>
  knex.transaction(trx =>
    knex('eventParticipants')
      .transacting(trx)
      .insert(fields)
      .returning('*')
      .then(results => results[0]),
  );

export const dbGetEventParticipation = (eventId, userId) =>
  knex('eventParticipants')
    .select(eventParticipantFields)
    .where({ userId })
    .andWhere({ eventId });

export const dbDelEventParticipation = (eventId, userId) =>
  knex('eventParticipants')
    .where({ userId })
    .andWhere({ eventId })
    .del();
