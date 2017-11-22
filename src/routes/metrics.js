import {merge} from 'lodash';
import Joi from 'joi';
import { getAuthWithScope } from '../utils/auth';
import {
  getNbMatchesMessaging,
  getAvgChatroomsPerUser,
  getNbMessagesByConversation,
  getNbMessages,
  getNbActiveUsers,
  getUsersRegistered,
} from '../handlers/metrics'

const metrics = [
  {
    method: 'GET',
    path: '/metrics/matchesmessaging',
    config: getAuthWithScope('admin'),
    handler: getNbMatchesMessaging,
  },
  {
    method: 'GET',
    path: '/metrics/avgchatroomsperuser',
    config: getAuthWithScope('admin'),
    handler: getAvgChatroomsPerUser,
  },
  {
    method: 'GET',
    path: '/metrics/messagesperconversation',
    config: getAuthWithScope('admin'),
    handler: getNbMessagesByConversation,
  },
  {
    method: 'GET',
    path: '/metrics/messages',
    config: getAuthWithScope('admin'),
    handler: getNbMessages,
  },
  {
    method: 'GET',
    path: '/metrics/activeusers',
    config: getAuthWithScope('admin'),
    handler: getNbActiveUsers,
  },
  {
    method: 'GET',
    path: '/metrics/usersregistered',
    config: getAuthWithScope('admin'),
    handler: getUsersRegistered,
  },
];

export default metrics;

export const routes = server => server.route(metrics);
