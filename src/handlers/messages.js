import Boom from 'boom';
import {
    dbGetMessages,
    dbGetMessage,
    dbCreateMessage,
  } from '../models/messages';

export const getMessages = (request, reply) => dbGetMessages().then(reply);
export const getMessage = (request, reply) =>
dbGetMessage(request.params.messageId).then(reply);

export const createMessage = (request, reply) => {
  return dbCreateMessage({
    ...request.payload,
    textMessage: request.payload.textMessage,
   // userReceiverId: request.payload.userReceiverId,
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
