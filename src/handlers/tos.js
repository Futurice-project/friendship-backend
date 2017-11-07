import Boom from 'boom';
import moment from 'moment';

import {
  dbGetAllTos,
  dbGetTos, 
  dbGetLatestTos,
  dbCreateTos,
} from '../models/tos';

export const getAllTos = (request, reply) => dbGetAllTos().then(reply);

export const getTos = (request, reply) =>
    dbGetTos(request.params.terms_of_serviceId).then(reply);

export const getLatestTos = (request, reply) => dbGetLatestTos().then(reply);

export const CreateTos = (request, reply) =>
    dbCreateTos({
    ...request.payload,
    tos_text: request.payload.tos_text,
    createdAt: moment(),
  }).then(reply);

// not acually needed, we want a history of terms of services,
// changes = new db entry
  /*
export const UpdateTos = async (request, reply) => {
    if (request.pre.user.scope !== 'admin') {
      return reply(
        Boom.unauthorized(
          'Unprivileged users cannot update personality',
        ),
      );
    }
    const fields = {
        tos_text: request.payload.tos_text,
        createdAt: moment(),
    };
  
    return dbUpdateTos(request.params.terms_of_serviceId, fields).then(reply);
  };

// Delete a Tos
export const delTos = (request, reply) => {
  
    return dbDelTos(request.payload.terms_of_serviceId).then(reply);
}; */

