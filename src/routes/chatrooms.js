import {
    getChatrooms,
    getChatroom,
} from '../handlers/chatrooms';

const chatrooms = [
    // Get a list of all users
  {
    method: 'GET',
    path: '/chatrooms',
    handler: getChatrooms,
  },
   // Get info about a specific user
  {
    method: 'GET',
    path: '/chatrooms/{chatroomId}',
    handler: getChatroom,
  },
];
export default chatrooms;
  // Here we register the routes
export const routes = server => server.route(chatrooms);
