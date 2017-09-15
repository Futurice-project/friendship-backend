import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope, doAuth } from '../utils/auth';
import {
  getTopics,
  getTopic,
  addTopic
} from '../handlers/topics';

const validateRegistrationFields = {
  validate: {
    payload: {
      name: Joi.string()
    },
  },
};

const topics = [
  // Get a list of all topics
  {
    method: 'GET',
    path: '/topics',
    config: getAuthWithScope('user'),
    handler: getTopics,
  },
  // Get info about a specific topic
  {
    method: 'GET',
    path: '/topics/{topicId}',
    config: getAuthWithScope('user'),
    handler: getTopic,
  },
  // Register new topic
  {
    method: 'POST',
    path: '/topics',
    config: validateRegistrationFields,
    handler: addTopic,
  },
];

export default topics;

// Here we register the routes
export const routes = server => server.route(topics);
