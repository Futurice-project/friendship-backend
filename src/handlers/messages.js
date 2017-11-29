import Boom from 'boom';
import {
    dbGetMessages,
    dbGetMessage,
    dbCreateMessage,
  } from '../models/messages';

export const getMessages = (request, reply) => dbGetMessages().then(reply);
export const getMessage = (request, reply) =>
dbGetMessage(request.params.messageId).then(reply);

export const createMessage = function(request, reply) {
  return dbCreateMessage({
    chat_time: new Date(),
    user_id: request.payload.userId,
    text_message: request.payload.textMessage,
    chatroom_id: request.params.chatroomId,
  })
    .then((message) => {
      this.publish(`/chatrooms/${request.params.chatroomId}`, request.payload.textMessage);
      return message;
    })
    .then(reply)
    .catch((err) => {
      if (err.constraint) {
        reply(Boom.conflict('Constraint Error: ', err));
      } else {
        reply(Boom.badImplementation(err));
      }
    });
};
