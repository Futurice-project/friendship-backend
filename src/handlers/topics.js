import Boom from 'boom';

import { dbGetTopics } from '../models/topics';

export const getTopics = (request, reply) => dbGetTopics().then(reply);
