import Boom from 'boom';

import {
  dbCreatePersonality
} from '../models/personalities';

export const createPersonality = (request, reply) => {
  dbCreatePersonality({
    ...request.payload,
  })
  .then(reply)
  .catch((err) => {
    if (err.constraint === 'users_email_unique') {
      reply(Boom.conflict('Account already exists'));
    } else {
      reply(Boom.badImplementation(err));
    }
  });
};

