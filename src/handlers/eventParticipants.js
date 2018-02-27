import Boom from 'boom';
import moment from 'moment';

import {
  dbGetEventParticipants,
  dbCreateEventParticipation,
  dbGetEventParticipation,
  dbDelEventParticipation,
  dbGetEventPerssonality,
  dbGetEventTopYeahsNahs,
} from '../models/eventParticipants';

export const getEventParticipants = (request, reply) =>
  dbGetEventParticipants(request.params.eventId, request.params.userId).then(
    reply,
  );

export const createEventParticipation = (request, reply) =>
  dbCreateEventParticipation({
    ...request.params,
    createdAt: moment(),
    userId: request.params.userId,
    eventId: request.params.eventId,
  }).then(reply);

export const getEventParticipation = (request, reply) => {
  return dbGetEventParticipation(
    request.params.eventId,
    request.params.userId,
  ).then(reply);
};

export const getEventPerssonality = (request, reply) => {
  return dbGetEventPerssonality(request.params.eventId).then(reply);
};

export const getEventTopYeahsNahs = (request, reply) => {
  return dbGetEventTopYeahsNahs(request.params.eventId).then(reply);
};

// Delete an EventParticipation that is connected to a user
export const delEventParticipation = (request, reply) => {
  return dbDelEventParticipation(
    request.params.eventId,
    request.params.userId,
  ).then(reply);
};
