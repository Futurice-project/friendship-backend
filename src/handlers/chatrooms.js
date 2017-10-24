import Boom from 'boom';
import {
    dbGetChatrooms,
    dbGetAllMsWithChatroomId,
    dbCreateChatroom,
    dbGetAllMsFromChatrooms,
  } from '../models/chatrooms';

export const getChatrooms = (request, reply) => dbGetChatrooms().then(reply);
export const getChatroom = (request, reply) =>
dbGetAllMsWithChatroomId(request.params.chatroomId).then(reply);

export const createChatroom = (request, reply) => {
  return dbCreateChatroom({
    ...request.payload,
    userCreatorId: request.payload.userCreatorId,
    userReceiverId: request.payload.userReceiverId,
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
export const getAllMsFromChatrooms = (request, reply) =>
dbGetAllMsFromChatrooms().then(reply);

