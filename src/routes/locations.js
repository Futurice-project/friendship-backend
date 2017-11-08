import { merge } from 'lodash';
import Joi from 'joi';

import {
  getLocations,
  getUserLocations,
  delLocation,
  delUserLocation,
  createUserLocations,
  addLocation,
} from '../handlers/locations';
import { getAuthWithScope } from '../utils/auth';

const validateUserId = {
  validate: {
    params: {
      userId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateLocationId = {
  validate: {
    params: {
      locationId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateLocationFields = {
  validate: {
    payload: {
      name: Joi.string().required(),
    },
  },
};

const validateUserLocationArray = {
  validate: {
    payload: {
      locations: Joi.array(),
    },
  },
};

const locations = [
  // get all personalities
  {
    method: 'GET',
    path: '/locations',
    config: getAuthWithScope('user'),
    handler: getLocations,
  },

  // delete location (not working at the moment due to FK constraint)
  {
    method: 'DELETE',
    path: '/locations/{locationId}',
    config: merge({}, validateLocationId, getAuthWithScope('admin')),
    handler: delLocation,
  },

  // Create new personality
  {
    method: 'POST',
    path: '/locations',
    config: merge({}, validateLocationFields, getAuthWithScope('admin')),
    handler: addLocation,
  },

  // Get all user-locations
  {
    method: 'GET',
    path: '/user_location/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('user')),
    handler: getUserLocations,
  },

  // Delete one user_location
  {
    method: 'DELETE',
    path: '/user_location',
    config: merge({}, validateLocationId, getAuthWithScope('user')),
    handler: delLocation,
  },


  // Add multiple locations to user
  // Always add all of the locations that the user chooses
  {
    method: 'POST',
    path: '/user_locations',
    config: merge({}, validateUserLocationArray, getAuthWithScope('user')),
    handler: createUserLocations,
  },
];

export default locations;

export const routes = server => server.route(locations);
