import {
  getPersonalities,
  getPersonality,
  delPersonality,
  updatePersonality,
  createPersonality,
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

  // Create new user_personality
  // Need to check if user is editing his/her own profile
  // Checking userId to match with request.userId
  // Check if personalityId is correct
  // 
  {
    method: 'POST',
    path: '/user_personality',
    // config: getAuthWithScope('user'),
    handler: createUserPersonality,
  },
];

export default personalities;

// Here we register the routes
export const routes = server => server.route(personalities);
