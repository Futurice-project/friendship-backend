import Boom from 'boom';

import {
  dbGetTopics,
  dbGetTopic,
  dbCreateTopic,
  dbDelTopic,
  dbUpdateTopic
} from '../models/topics';

export const getTopics = (request, reply) => dbGetTopics().then(reply);

export const getTopic = (request, reply) =>
  dbGetTopic(request.params.topicId).then(reply);

export const addTopic = (request, reply) =>
  dbCreateTopic({
    ...request.payload,
    name: request.payload.name
  }).then(reply);

export const delTopic = (request, reply) => {
  return dbDelTopic(request.params.topicId).then(reply);
};

export const updateTopic = async (request, reply) => {
  const fields = {
   name: request.payload.name
  };

  return dbUpdateTopic(request.params.topicId, fields).then(reply);
}
