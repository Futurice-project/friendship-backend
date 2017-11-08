import Boom from 'boom';

import {
  dbAddLocation,
  dbCreateUserLocations,
  dbDelUserLocation,
  dbDelLocation,
  dbGetLocations,
  dbGetUserLocations,
} from '../models/locations';

export const getLocations = (request, reply) => dbGetLocations().then(reply);

export const addLocation = (request, reply) =>
  dbAddLocation({
    ...request.payload,
    name: request.payload.name,
  })
    .then(reply)
    .catch(err => reply(Boom.badImplementation(err)),
  );

export const delLocation = (request, reply) => {
  if (
    request.pre.user.scope !== 'admin' &&
    request.pre.user.id !== request.params.userId
  ) {
    return reply(
      Boom.unauthorized('Unprivileged users cannnot delete location!'),
    );
  }
  return dbDelLocation(request.params.locationId).then(reply);
};

export const getUserLocations = (request, reply) =>
  dbGetUserLocations(request.params.userId).then(reply);

export const delUserLocation = (request, reply) => {
  if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
    return reply(Boom.unauthorized('Cannot update other users!'));
  }

  return dbDelUserLocation(request.pre.user.id, request.payload.locationId).then(reply);
};

export const createUserLocations = (request, reply) => {
  const locations = [];
  request.payload.locations.forEach((location) => {
    locations.push({
      locationId: location.locationId,
      userId: request.pre.user.id,
    });
  });
  
  return dbCreateUserLocations(locations)
  .then(reply)
  .catch(error => console.log(error));
};

