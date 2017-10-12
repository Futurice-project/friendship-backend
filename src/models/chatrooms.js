import knex from '../utils/db';

const chatroomFields = ['id', 'userCreatorId', 'userReceiverId'];

export const dbGetChatrooms = () => knex('chatrooms').select(chatroomFields).orderBy('id', 'asc');

export const dbGetChatroom = id =>
knex('chatrooms')
  .first()
  .where({ id });
export const dbCreateChatroom = ({ ...fields }) =>
knex.transaction(async (trx) => {
  const chatroom = await trx('chatrooms')
    .insert(fields)
    .returning('*')
    .then(results => results[0]); // return only first result
  return chatroom;
});

