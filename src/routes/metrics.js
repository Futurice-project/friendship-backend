import {merge} from 'lodash';
import Joi from 'joi';
import { getAuthWithScope } from '../utils/auth';
import {
  getNbMatchesMessaging,
  getNbMessagesByDayByConversation,
  getNbMessages,
  getNbActiveUsers,
  getNbMessagesByConversation
} from '../handlers/metrics'

const metrics = [
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
    path: '/metrics/messagesbyconversation',
    config: getAuthWithScope('admin'),
    handler: getNbMessagesByConversation,
  },
  {
    method: 'GET',
    path: '/metrics/messagesmessaging',
    config: getAuthWithScope('admin'),
    handler: getNbMatchesMessaging,
  },
];

export default metrics;

export const routes = server => server.route(metrics);
