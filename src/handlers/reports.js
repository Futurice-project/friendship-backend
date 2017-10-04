import Boom from 'boom';
import moment from 'moment';

import {
  dbGetReports,
  dbGetReport, 
  dbCreateReport,
  dbUpdateReport,
  dbDelReport,
} from '../models/reports';

export const getReports = (request, reply) => dbGetReports().then(reply);

export const getReport = (request, reply) =>
  dbGetReport(request.params.reportId).then(reply);

export const CreateReport = (request, reply) =>
  dbCreateReport({
    ...request.payload,
    userId: request.payload.userId,
    createdAt: moment(),
    description: request.payload.description,
    reported_by: request.payload.reported_by,
  }).then(reply);

export const UpdateReport = async (request, reply) => {
    if (request.pre.user.scope !== 'admin') {
      return reply(
        Boom.unauthorized(
          'Unprivileged users cannot update personality',
        ),
      );
    }
  
    const fields = {
        userId: request.payload.userId,
        createdAt: moment(),
        description: request.payload.description,
        reported_by: request.payload.reported_by,
    };
  
    return dbUpdateReport(request.params.reportId, fields).then(reply);
  };

// Delete a Report that is connected to a user
export const delReport = (request, reply) => {
  /*
    if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
      return reply(
        Boom.unauthorized(
          'Cannot update other users!',
        ),
      );
    }*/
  
    return dbDelReport(request.payload.reportId).then(reply);
  };

