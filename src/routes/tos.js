import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope } from '../utils/auth';
import {
  getAllTos,
  getTos,
  getLatestTos,
  CreateTos,
} from '../handlers/tos';

const validateTosId = {
  validate: {
    params: {
      terms_of_serviceId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateTosFields = {
  validate: {
    payload: {
        tos_text: Joi.string(),
    },
  },
};


const terms_of_service = [
  // Get a list of all terms of services
  {
    method: 'GET',
    path: '/allTos',
    config: getAuthWithScope('admin'),
    handler: getAllTos,
  },
  // Get info about a specific tos
  {
    method: 'GET',
    path: '/tos/{terms_of_serviceId}',
    config: merge({}, validateTosId, getAuthWithScope('admin')),
    handler: getTos,
  },
  // Get the latest and relevant Tos
  {
    method: 'GET',
    path: '/tos/latest',
    config: merge({}, getAuthWithScope('admin')),
    handler: getLatestTos,
  },
  // Register new reports
  {
    method: 'POST',
    path: '/tos',
    config: merge({}, validateTosFields, getAuthWithScope('admin')),
    handler: CreateTos,
  },
  // not needed for tos because of history

  /*
  // Delete a reports, admin only
  {
    method: 'DELETE',
    path: '/reports/{reportId}',
    config: merge({}, validateReportId, getAuthWithScope('admin')),
    handler: delReport,
  },
  // Update reports, admin only
  {
    method: 'PATCH',
    path: '/reports/{reportId}',
    config: merge({}, validateReportFields, getAuthWithScope('admin')),
    handler: UpdateReport,
  },
  */
];

export default terms_of_service;

// Here we register the routes
export const routes = server => server.route(terms_of_service);

