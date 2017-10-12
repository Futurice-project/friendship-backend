import Boom from 'boom';
import {
    dbGetChatrooms,
    dbGetChatroom,
    dbCreateChatroom,
  } from '../models/chatrooms';

export const getChatrooms = (request, reply) => dbGetChatrooms().then(reply);
export const getChatroom = (request, reply) =>
dbGetChatroom(request.params.chatroomId).then(reply);

export const createChatroom = (request, reply) => {
  /*if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
    return reply(
        Boom.unauthorized(
          'Cannot update other users!',
        ),
      );
  }*/
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
