import {
  createPersonality,
} from '../handlers/personalities';

const personalities = [
  {
    method: 'POST',
    path: '/personalities',
    handler: createPersonality,
  },
];

export default personalities;

// Here we register the routes
export const routes = server => server.route(personalities);
