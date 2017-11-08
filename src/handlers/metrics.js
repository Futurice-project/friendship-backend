import Boom from 'boom';

import {
  dbGetNbMatchesMessaging,
  dbGetNbMessagesByConversation,
  dbGetNbMessages,
  dbGetNbActiveUsers,
} from '../models/metrics';

export const getNbMatchesMessaging = (request, reply) => {
  dbGetNbMatchesMessaging().then(reply);
}

export const getNbMessagesByConversation = (request, reply) => {
  dbGetNbMessagesByConversation().then(reply);
}

export const getNbMessages = (request, reply) => {
  dbGetNbMessages().then(reply);
}

export const getNbActiveUsers = (request, reply) => {
  dbGetNbActiveUsers().then(reply);
}
