import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope, doAuth } from '../utils/auth';
import {
  getUsers,
  getUsersBatch,
  getUser,
  updateUser,
  delUser,
  banUser,
  authUser,
  registerUser,
  verifyUser,
  getUserByUsername,
  getFilteredUsers,
} from '../handlers/users';

const validateUserId = {
  validate: {
    params: {
      userId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateRegistrationFields = {
  validate: {
    payload: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
    },
  },
};

const validateBanFields = {
  validate: {
    payload: {
      reason: Joi.string().required(),
      expire: Joi.string(),
    },
    params: {
      userId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validatePageNumber = {
  validate: {
    params: {
      pageNumber: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateUserDetails = {
  validate: {
    payload: {
      username: Joi.string(),
      password: Joi.string(),
      scope: Joi.string(),
      email: Joi.string().email(),
      description: Joi.string(),
      emoji: Joi.string(),
      image: Joi.binary(),
      compatibility: Joi.string(),
      location: Joi.string(),
      enubleMatching: Joi.boolean(),
      birthday: Joi.date(),
      active: Joi.boolean(),
    },
  },
};

const users = [
  // Get a list of all users
  {
    method: 'GET',
    path: '/users',
    config: getAuthWithScope('user'),
    handler: getUsers,
  },
  {
    method: 'GET',
    path: '/users/filter',
    config: getAuthWithScope('admin'),
    handler: getUsers,
  },

  // Get a list of users in batches. Used with infinite scroller
  // Starts with page 0 lol
  {
    method: 'GET',
    path: '/users/page/{pageNumber}',
    config: merge({}, validatePageNumber, getAuthWithScope('user')),
    handler: getUsersBatch,
  },

  // Get info about a specific user by username
  {
    method: 'GET',
    path: '/users/search/{username}',
    config: merge({}, getAuthWithScope('user')),
    handler: getUserByUsername,
  },

  // Get info about a specific user
  {
    method: 'GET',
    path: '/users/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('user')),
    handler: getUser,
  },

  // Update user profile
  {
    method: 'PATCH',
    path: '/users/{userId}',
    config: merge({}, validateUserDetails, getAuthWithScope('user')),
    handler: updateUser,
  },

  // Delete a user, admin only
  {
    method: 'DELETE',
    path: '/users/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('admin')),
    handler: delUser,
  },

  {
    method: 'POST',
    path: '/users/{userId}/ban',
    config: merge({}, validateBanFields, getAuthWithScope('admin')),
    handler: banUser,
  },

  // Authenticate as user
  {
    method: 'POST',
    path: '/users/authenticate',
    config: doAuth,
    handler: authUser,
  },

  // Register new user
  {
    method: 'POST',
    path: '/users',
    config: validateRegistrationFields,
    handler: registerUser,
  },

  // Verify a new user using a hash e-mail link
  {
    method: 'GET',
    path: '/users/verify/{hash}',
    handler: verifyUser,
  },
];

export default users;

// Here we register the routes
export const routes = server => server.route(users);
