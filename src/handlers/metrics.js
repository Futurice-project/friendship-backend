import Boom from 'boom';

import {
  dbGetNbMatchesMessaging,
  dbGetAvgChatroomsPerUser,
  dbGetNbMessagesByConversation,
  dbGetNbMessages,
  dbGetNbActiveUsers,
  dbgetMetricsRegisteredUsers
} from '../models/metrics';

export const getNbMatchesMessaging = (request, reply) => {
  dbGetNbMatchesMessaging().then(reply);
}

export const getAvgChatroomsPerUser = (request, reply) => {
  dbGetAvgChatroomsPerUser().then(reply);
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

export const getMetricsRegisteredUsers = (request, reply) => {
  return dbgetMetricsRegisteredUsers().then(reply);
}