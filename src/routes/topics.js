import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope } from '../utils/auth';
import {
  getTopics,
  getTopic,
  addTopic,
  delTopic,
  updateTopic,
  getUserTopics,
  createUserTopic,
  delUserTopic,
} from '../handlers/topics';

const validateTopicId = {
  validate: {
    params: {
      topicId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateTopicFields = {
  validate: {
    payload: {
      name: Joi.string(),
    },
  },
};

const validateUserTopicFields = {
  validate: {
    payload: {
      topicId: Joi.number()
        .integer()
        .required(),
      love: Joi.boolean().required(),
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
    config: merge({}, validateTopicId, getAuthWithScope('user')),
    handler: getTopic,
  },
  // Register new topic
  {
    method: 'POST',
    path: '/topics',
    config: merge({}, validateTopicFields, getAuthWithScope('user')),
    handler: addTopic,
  },
  // Delete a topic, admin only
  {
    method: 'DELETE',
    path: '/topics/{topicId}',
    config: merge({}, validateTopicId, getAuthWithScope('admin')),
    handler: delTopic,
  },
  // Update topic, admin only
  {
    method: 'PATCH',
    path: '/topics/{topicId}',
    config: merge({}, validateTopicId, getAuthWithScope('admin')),
    handler: updateTopic,
  },
  {
    method: 'GET',
    path: '/user_topic/{userId}',
    config: getAuthWithScope('user'),
    handler: getUserTopics,
  },
  // Add new topic to a user
  // Love is a boolean. True = love, false = hate the topic.
  {
    method: 'POST',
    path: '/user_topic',
    config: merge({}, validateUserTopicFields, getAuthWithScope('user')),
    handler: createUserTopic,
  },
  //  Delete a topic that is connected to a user
  // @todo check if the OWNER is deleting this,
  // and not another user (somehow we can't to get details of authenticated user, ask rasmus
  {
    method: 'DELETE',
    path: '/user_topic/{topicId}',
    config: merge({}, validateTopicId, getAuthWithScope('user')),
    handler: delUserTopic,
  },

];

export default topics;

// Here we register the routes
export const routes = server => server.route(topics);
