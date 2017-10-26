import { getAuthWithScope } from '../utils/auth';
import {
    getChatrooms,
    getChatroom,
    createChatroom,
    getAllMsFromChatrooms,
    getChatroomsByUserId,
} from '../handlers/chatrooms';
import {
  createMessage,
} from '../handlers/messages';

const chatrooms = [
    // Get a list of all users. them user name 2 con , last message or all mss
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
  {
    method: 'GET',
    path: '/chatrooms/userid/{userId}',
    handler: getChatroomsByUserId,
  },
  // get all ms from all chatrooms
  {
    method: 'GET',
    path: '/chatrooms/messages',
    handler: getAllMsFromChatrooms,
  },
 // Get info about a specific user
  {
    method: 'POST',
    path: '/chatrooms',
    config: getAuthWithScope('user'),
    handler: createChatroom,
  },
  // create post
  {
    method: 'POST',
    path: '/chatrooms/{chatroomId}',
    config: getAuthWithScope('user'),
    handler: createMessage,
  },
];
export default chatrooms;
  // Here we register the routes
export const routes = server => server.route(chatrooms);
