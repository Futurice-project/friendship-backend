// REGISTER THE PLUGIN
// call the function --
// paramter id on prerequest
// you can test with concolse log

'use strict';
import {dbUserLastActive} from '../models/metrics';

exports.register = function (server, options, next) {
       console.log("111111111111111111111111111111111111111111");

       server.ext('onRequest', (request, reply) => {
         console.log("222222222222222222222222222222222");

         const user = request.pre.user;
         dbUserLastActive(user.id);

         return reply.continue();

       });
       next();
     }


 exports.register.attributes = {
     name: 'metrics',
     version: '1.0.0'
 };
