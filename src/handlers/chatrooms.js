import {
    dbGetChatrooms,
    dbGetChatroom,
  } from '../models/chatrooms';

export const getChatrooms = (request, reply) => dbGetChatrooms().then(reply);
export const getChatroom = (request, reply) =>
dbGetChatroom(request.params.chatroomId).then(reply);
