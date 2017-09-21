import {
  getPersonalities,
  getPersonality,
  delPersonality,
  updatePersonality,
  createPersonality,
  getUserPersonalities,
  updateUserPersonality,
  createUserPersonality,
} from '../handlers/personalities';
import { getAuthWithScope } from '../utils/auth';

const personalities = [
  // get all personalities
  {
    method: 'GET',
    path: '/personalities',
    config: getAuthWithScope('user'),
    handler: getPersonalities,
  },

  // get one personality
  {
    method: 'GET',
    path: '/personalities/{personalityId}',
    config: getAuthWithScope('user'),
    handler: getPersonality,
  },

  // delete personality (not working at the moment)
  {
    method: 'DELETE',
    path: '/personalities/{personalityId}',
    config: getAuthWithScope('admin'),
    handler: delPersonality,
  },

  // Update personality
  {
    method: 'PATCH',
    path: '/personalities/{personalityId}',
    config: getAuthWithScope('admin'),
    handler: updatePersonality,
  },

  // Create new personality
  {
    method: 'POST',
    path: '/personalities',
    config: getAuthWithScope('admin'),
    handler: createPersonality,
  },


  // get all user personalities
  {
    method: 'GET',
    path: '/user_personality/{userId}',
    config: getAuthWithScope('user'),
    handler: getUserPersonalities,
  },

  {
    method: 'PATCH',
    path: '/user_personality',
    config: getAuthWithScope('user'),
    handler: updateUserPersonality,
  },

  // Create new user_personality
  // Need to check if user is editing his/her own profile
  // Checking userId to match with request.userId (done)
  // Check if personalityId is correct (constraint check)
  // Check if the field is already there (userId and personalityId) 
  // now it can be inserted more than once
  {
    method: 'POST',
    path: '/user_personality',
    config: getAuthWithScope('user'),
    handler: createUserPersonality,
  },
];

export default personalities;

// Here we register the routes
export const routes = server => server.route(personalities);
