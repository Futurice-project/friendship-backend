import Boom from 'boom';
import moment from 'moment';

import {
  dbGetEvents,
  dbGetEvent,
  dbCreateEvent,
  dbDelEvent,
  dbUpdateEvent,
} from '../models/events';

export const getEvents = (request, reply) => dbGetEvents().then(reply);

export const getEvent = (request, reply) =>
  dbGetEvent(request.params.eventId).then(reply);

export const CreateEvent = (request, reply) =>
  dbCreateEvent({
    ...request.payload,
    createdAt: moment(),
    title: request.payload.title,
    eventImage: request.payload.eventImage,
    description: request.payload.description,
    address: request.payload.address,
    city: request.payload.city,
    eventDate: request.payload.eventDate,
  }).then(reply);

export const UpdateEvent = async (request, reply) => {
  if (request.pre.user.scope !== 'admin') {
    return reply(Boom.unauthorized('Unprivileged users cannot update events'));
  }

  const fields = {
    createdAt: moment(),
    title: request.payload.title,
    eventImage: request.payload.eventImage,
    description: request.payload.description,
    address: request.payload.address,
    city: request.payload.city,
    eventDate: request.payload.eventDate,
  };

  return dbUpdateEvent(request.params.reportId, fields).then(reply);
};

// Delete a Event that is connected to a user
export const delEvent = (request, reply) => {
  return dbDelEvent(request.payload.eventId).then(reply);
};
