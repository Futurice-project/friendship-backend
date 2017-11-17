import { merge } from 'lodash';
import Joi from 'joi';

import {
  getGenders,
  getGender,
  createGender,
  updateGender,
  getUserGenders,
  createUserGender,
  delUserGender,
} from '../handlers/genders';
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

const validateGenderId = {
  validate: {
    params: {
      genderId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateGenderFields = {
  validate: {
    payload: {
      gender: Joi.string().required(),
    },
  },
};

const validateUserGenderFields = {
  validate: {
    payload: {
      userId: Joi.number().integer().required(),
      genderId: Joi.number().integer().required(),
    },
  },
};

const genders = [
  {
    method: 'GET',
    path: '/genders',
    config: getAuthWithScope('user'),
    handler: getGenders,
  },
  {
    method: 'GET',
    path: '/genders/{genderId}',
    config: merge({}, validateGenderId, getAuthWithScope('user')),
    handler: getGender,
  },
  // Create new gender
  {
    method: 'POST',
    path: '/genders',
    config: merge({}, validateGenderFields, getAuthWithScope('admin')),
    handler: createGender,
  },
  // Update gender
  {
    method: 'PATCH',
    path: '/genders/{genderId}',
    config: merge({}, validateGenderId, validateGenderFields, getAuthWithScope('admin')),
    handler: updateGender,
  },
  // Get all user genders
  {
    method: 'GET',
    path: '/user_gender/{userId}',
    config: merge({}, validateUserId, getAuthWithScope('user')),
    handler: getUserGenders,
  },
  // create new record in user_gender table
  {
    method: 'POST',
    path: '/user_gender',
    config: merge({}, validateUserGenderFields, getAuthWithScope('user')),
    handler: createUserGender,
  },
  {
    method: 'DELETE',
    path: '/user_gender',
    config: merge({}, validateUserGenderFields, getAuthWithScope('user')),
    handler: delUserGender,
  },
];

export default genders;

export const routes = server => server.route(genders);
