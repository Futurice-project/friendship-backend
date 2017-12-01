'use strict';
import {dbUserLastActive} from '../models/metrics';

const metrics = {
     register: function (server, options, next) {

       server.ext('onPreRequest', (request, reply) => {

         const user = request.pre.user;
         dbUserLastActive(user.id);

            // call the function --
            // paramter id on prerequest
            // you can test with concolse log

        console.log(1);
         return reply.continue();

       });
       next();
     }
 };


 metrics.register.attributes = {
     name: 'metrics',
     version: '1.0.0'
 };
