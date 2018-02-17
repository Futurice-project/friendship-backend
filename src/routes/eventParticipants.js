import { merge } from 'lodash';
import Joi from 'joi';
import { getAuthWithScope } from '../utils/auth';

import {
  getEventParticipants,
  createEventParticipation,
  getEventParticipation,
  delEventParticipation,
} from '../handlers/eventParticipants';

const validateEventPaticipationId = {
  validate: {
    params: {
      id: Joi.number()
        .integer()
        .required(),
    },
  },
};

const eventParticipants = [
  // Get a list of all events
  {
    method: 'GET',
    path: '/eventParticipants/{eventId}/{userId}',
    handler: getEventParticipants,
  },
  // Get info about a specific reports
  {
    method: 'GET',
    path: '/eventParticipation/{eventId}/{userId}',
    handler: getEventParticipation,
  },
  {
    method: 'POST',
    path: '/eventParticipation/{eventId}/{userId}',
    handler: createEventParticipation,
  },
  {
    method: 'DELETE',
    path: '/eventParticipation/{eventId}/{userId}',
    //config: merge({}, validateEventFields, getAuthWithScope('admin')),
    handler: delEventParticipation,
  },
];

export default eventParticipants;

// Here we register the routes
export const routes = server => server.route(eventParticipants);
