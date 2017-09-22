import { merge } from 'lodash';
import Joi from 'joi';

import {
  getPersonalities,
  getPersonality,
  delPersonality,
  updatePersonality,
  createPersonality,
  getUserPersonalities,
  updateUserPersonality,
  createUserPersonality,
} from '../handlers/personalities';
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

const validatePersonalityId = {
  validate: {
    params: {
      personalityId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validatePersonalityFields = {
  validate: {
    payload: {
      name: Joi.string().required(),
    },
  },
};

const validateUserPersonalityFields = {
  validate: {
    payload: {
      userId: Joi.number().integer().required(),
      personalityId: Joi.number().integer().required(),
      level: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
    },
  },
};

const personalities = [
  // get all personalities
  {
    method: 'GET',
    path: '/personalities',
    config: getAuthWithScope('user'),
    handler: getPersonalities,
  },

  // get one personality
  {
    method: 'GET',
    path: '/personalities/{personalityId}',
    config: merge({}, validatePersonalityId, getAuthWithScope('user')),
    handler: getPersonality,
  },

  // delete personality (not working at the moment due to FK constraint)
  {
    method: 'DELETE',
    path: '/personalities/{personalityId}',
    config: merge({}, validatePersonalityId, getAuthWithScope('admin')),
    handler: delPersonality,
  },

  // Update personality
  {
    method: 'PATCH',
    path: '/personalities/{personalityId}',
    config: merge({}, validatePersonalityId, validatePersonalityFields, getAuthWithScope('admin')),
    handler: updatePersonality,
  },

  // Create new personality
  {
    method: 'POST',
    path: '/personalities',
    config: merge({}, validatePersonalityFields, getAuthWithScope('admin')),
    handler: createPersonality,
  },


  // Get all user personalities
  {
    method: 'GET',
    path: '/user_personality/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('user')),
    handler: getUserPersonalities,
  },

  {
    method: 'PATCH',
    path: '/user_personality',
    config: getAuthWithScope('user'),
    handler: updateUserPersonality,
  },

  // create new record in user_personality table
  // example payload: { userId: 1, personalityId: 4, level: 3 }
  {
    method: 'POST',
    path: '/user_personality',
    config: merge({}, validateUserPersonalityFields, getAuthWithScope('user')),
    handler: createUserPersonality,
  },
];

export default personalities;

// Here we register the routes
export const routes = server => server.route(personalities);
