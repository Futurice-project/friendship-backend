'use strict';
import {dbUserLastActive} from '../models/metrics';

exports.register = function (server, options, next) {

      server.ext('onPostHandler', async (request, reply) => {

        const user = request.pre.user;

        if (user) {
          await dbUserLastActive(user.id);
        }

        return reply.continue();

      });
      next();
    }


exports.register.attributes = {
    name: 'metrics',
    version: '1.0.0'
};
