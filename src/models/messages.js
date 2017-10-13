import knex from '../utils/db';

const messageFields = ['id', 'textMessage', 'chatTime', 'userId', 'chatroomId'];

export const dbGetMessages = () => knex('messages').select(messageFields).orderBy('id', 'asc');
// get all ms by a userId
export const dbGetMessage = userId =>
knex('messages')
  .select()
  .where({ userId });
export const dbCreateMessage = ({ ...fields }) =>
knex.transaction(async (trx) => {
  const message = await trx('messages')
    .insert(fields)
    .returning('*')
    .then(results => results[0]); // return only first result
  return message;
});
