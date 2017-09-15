import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope, doAuth } from '../utils/auth';
import {
 getTopics
} from '../handlers/topics';

const topics = [
  // Get a list of all topics
  {
    method: 'GET',
    path: '/topics',
    config: getAuthWithScope('user'),
    handler: getTopics,
  }
];

export default topics;

// Here we register the routes
export const routes = server => server.route(topics);
