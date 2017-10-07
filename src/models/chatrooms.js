import knex from '../utils/db';

const chatroomFields = ['id', 'userCreatorId', 'userReceiverId'];

export const dbGetChatrooms = () => knex('chatrooms').select(chatroomFields).orderBy('id', 'asc');

export const dbGetChatroom = id =>
knex('chatrooms')
  .first()
  .where({ id });
