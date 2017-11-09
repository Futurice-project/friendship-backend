import knex from '../utils/db';

const selectChatroomQuery =
    `SELECT chatrooms.id as chatroomId, 
      (SELECT json_build_object('id', id, 'username', username, 'emoji', emoji) 
              FROM users WHERE id = user_creator_id) as creator, 
      (SELECT json_build_object('id', id, 'username', username, 'emoji', emoji) 
              FROM users WHERE id = user_receiver_id) as receiver,   
      ARRAY_AGG(row_to_json(messages) ORDER BY messages.id) as messages
    FROM chatrooms JOIN messages ON chatrooms.id = messages.chatroom_id`;

export const dbGetAllMsWithChatroomId = chatroomId =>
knex.raw(`${selectChatroomQuery}
          WHERE chatroom_id = ${chatroomId}
          GROUP BY chatrooms.id;`)
.then(results => results.rows[0]);

export const dbGetChatrooms = () =>
knex.raw(`${selectChatroomQuery}
          GROUP BY chatrooms.id;`)
.then(results => results.rows);

export const dbGetChatroomsByUserId = userId =>
knex.raw(`${selectChatroomQuery}
          WHERE user_receiver_id = ${userId} OR user_creator_id = ${userId}
          GROUP BY chatrooms.id;`)
.then(results => results.rows);

export const dbGetAllMsFromChatrooms = () =>
knex('chatrooms')
.join('messages', 'chatrooms.id', 'messages.chatroomId')
.join('users as u1', 'messages.userId', 'u1.id')
.select('messages.chatroomId', 'messages.userId as userCreatorId', 'u1.username as userCreatorName', 'messages.textMessage', 'messages.chatTime')
.orderBy('chatrooms.id', 'asc');

export const dbCreateChatroom = ({ ...fields }) =>
knex('chatrooms')
    .insert(fields)
    .returning('*')
    .then(results => results[0]); // return only first result

