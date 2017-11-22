import Boom from 'boom';

import {
  dbGetNbMatchesMessaging,
  dbGetAvgChatroomsPerUser,
  dbGetNbMessagesByConversation,
  dbGetNbMessages,
  dbGetNbActiveUsers,
  dbGetUsersRegistered,
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

export const getUsersRegistered = (request, reply) => {
  dbGetUsersRegistered().then(reply);
}
