import Boom from 'boom';

import {
  dbGetGenders,
  dbGetGender,
  dbGetUserGenders,
  dbCreateUserGender,
  dbDelUserGender,
} from '../models/genders';

export const getGenders = (request, reply) =>
  dbGetGenders().then(reply);

export const getGender = (request, reply) =>
  dbGetGender(request.params.genderId).then(reply);

export const getUserGenders = (request, reply) =>
  dbGetUserGenders(request.params.userId).then(reply);

export const createUserGender = (request, reply) => {
  if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
    return reply(
      Boom.unauthorized(
        'Cannot update other users!',
      ),
    );
  }

  return dbCreateUserGender({
    ...request.payload,
    userId: request.payload.userId,
    genderId: request.payload.genderId,
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

export const delUserGender = (request, reply) => {
  if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
    return reply(Boom.unauthorized('Cannot update other users!'));
  }

  return dbDelUserGender(request.payload.userId, request.payload.genderId).then(reply);
};
