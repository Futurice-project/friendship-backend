import knex from '../utils/db';


export const dbGetAllMsWithChatroomId = chatroom_id =>
knex('messages')
  .where({ chatroom_id }).as('messages');

export const dbGetChatrooms = () =>
knex('chatrooms')
.innerJoin('messages', 'chatrooms.id', 'messages.chatroom_id')
.select([
  'chatrooms.id as chatroomId',
  'user_creator_id',
  'user_receiver_id',
  knex.raw('ARRAY_AGG(row_to_json(messages)) as messages')])
.groupBy('chatrooms.id');


export const dbGetChatroomsByUserId = userId =>
knex('chatrooms')
.innerJoin('messages', 'chatrooms.id', 'messages.chatroom_id')
.select([
  'chatrooms.id as chatroomId',
  'user_creator_id',
  'user_receiver_id',
  knex.raw('ARRAY_AGG(row_to_json(messages)) as messages')])
.where('user_creator_id', userId)
.orWhere('user_receiver_id', userId)
.groupBy('chatrooms.id');

export const dbGetAllMsFromChatrooms = () =>
knex('chatrooms')
.join('messages', 'chatrooms.id', 'messages.chatroomId')
.join('users as u1', 'messages.userId', 'u1.id')
//.join('users as u2', 'chatrooms.userReceiverId', 'u2.id')
.select('messages.chatroomId', 'messages.userId as userCreatorId', 'u1.username as userCreatorName', 'messages.textMessage', 'messages.chatTime')
.orderBy('chatrooms.id', 'asc');

export const dbCreateChatroom = ({ ...fields }) =>
knex('chatrooms')
    .insert(fields)
    .returning('*')
    .then(results => results[0]); // return only first result

