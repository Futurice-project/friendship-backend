import { getAuthWithScope } from '../utils/auth';
import {
    getChatrooms,
    getChatroom,
    createChatroom,
} from '../handlers/chatrooms';
import {
  createMessage,
} from '../handlers/messages';

const chatrooms = [
    // Get a list of all users
  {
    method: 'GET',
    path: '/chatrooms',
    handler: getChatrooms,
  },
   // Get all ms with chatroom Id
  {
    method: 'GET',
    path: '/chatrooms/{chatroomId}',
    handler: getChatroom,
  },
 // Get info about a specific user
  {
    method: 'POST',
    path: '/chatrooms',
    config: getAuthWithScope('user'),
    handler: createChatroom,
  },
  // create post messages
  {
    method: 'POST',
    path: '/chatrooms/{chatroomId}/messages',
    config: getAuthWithScope('user'),
    handler: createMessage,
  },
];
export default chatrooms;
  // Here we register the routes
export const routes = server => server.route(chatrooms);
