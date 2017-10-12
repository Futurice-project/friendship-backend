import knex from '../utils/db';

const messageFields = ['id', 'textMessage', 'chatTime', 'userId', 'chatroomId'];

export const dbGetMessages = () => knex('messages').select(messageFields).orderBy('id', 'asc');

export const dbGetMessage = id =>
knex('messages')
  .first()
  .where({ id });
export const dbCreateMessage = ({ ...fields }) =>
knex.transaction(async (trx) => {
  const message = await trx('messages')
    .insert(fields)
    .returning('*')
    .then(results => results[0]); // return only first result
  return message;
});
