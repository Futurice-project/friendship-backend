import Boom from 'boom';

import {
  dbGetTopics,
  dbGetTopic,
  dbCreateTopic
} from '../models/topics';

export const getTopics = (request, reply) => dbGetTopics().then(reply);

export const getTopic = (request, reply) =>
  dbGetTopic(request.params.topicId).then(reply);

export const addTopic = (request, reply) =>
  dbCreateTopic({
    ...request.payload,
    name: request.payload.name
  }).then(reply);
