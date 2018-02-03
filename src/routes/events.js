import { merge } from 'lodash';
import Joi from 'joi';
import { getAuthWithScope } from '../utils/auth';

import {
  getEvents,
  getEvent,
  CreateEvent,
  UpdateEvent,
  delEvent
} from '../handlers/events';

const validateEventId = {
  validate: {
    params: {
      eventId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateEventFields = {
  validate: {
    payload: {
      description: Joi.string(),
      location : Joi.string(),
      eventDate : Joi.date().timestamp(),
      createdAt : Joi.date().timestamp(),
    },
  },
};


const events = [
  // Get a list of all events
  {
    method: 'GET',
    path: '/events',
    handler: getEvents,
  },
  // Get info about a specific reports
  {
    method: 'GET',
    path: '/event/{eventId}',
    handler: getEvent,
  },
  {
    method: 'POST',
    path: '/events',
    config: merge({}, validateEventFields, getAuthWithScope('user')),
    handler: CreateEvent,
  },
  {
    method: 'DELETE',
    path: '/events/{eventid}',
    //config: merge({}, validateEventFields, getAuthWithScope('admin')),
    handler: delEvent,
  },
];

export default events;

// Here we register the routes
export const routes = server => server.route(events);
