import { merge } from 'lodash';
import Joi from 'joi';

import { getAuthWithScope } from '../utils/auth';
import {
  getTags,
  getTag,
  addTag,
  delTag,
  updateTag,
  getUserTags,
  getTagsUser,
  countTagLikes,
  createUserTag,
  delUserTag,
  getTagsForUser,
  getTagList,
  getUsersInTag,
} from '../handlers/tags';

const validateTagId = {
  validate: {
    params: {
      tagId: Joi.number()
        .integer()
        .required(),
    },
  },
};

const validateTagFields = {
  validate: {
    payload: {
      name: Joi.string(),
    },
  },
};

const validateUserTagFields = {
  validate: {
    payload: {
      userId: Joi.number()
        .integer()
        .required(),
      tagId: Joi.number()
        .integer()
        .required(),
      love: Joi.boolean(),
    },
  },
};

const tags = [
  // Get a list of all tags
  {
    method: 'GET',
    path: '/tags',
    config: getAuthWithScope('user'),
    handler: getTags,
  },
  // Get info about a specific tag
  {
    method: 'GET',
    path: '/tagsForUser/{userId}',
    config: getAuthWithScope('user'),
    handler: getTagsForUser,
  },
  {
    method: 'GET',
    path: '/tags/{tagId}',
    config: merge({}, validateTagId),
    handler: getTag,
  },
  // Register new tag
  {
    method: 'POST',
    path: '/tags',
    config: merge({}, validateTagFields, getAuthWithScope('user')),
    handler: addTag,
  },
  // Delete a tag, admin only
  {
    method: 'DELETE',
    path: '/tags/{tagId}',
    config: merge({}, validateTagId, getAuthWithScope('admin')),
    handler: delTag,
  },
  // Update tag, admin only
  {
    method: 'PATCH',
    path: '/tags/{tagId}',
    config: merge({}, validateTagId, getAuthWithScope('admin')),
    handler: updateTag,
  },
  {
    method: 'GET',
    path: '/user_tag/{userId}',
    config: getAuthWithScope('user'),
    handler: getUserTags,
  },
  // Get all usernames of a tag
  {
    method: 'GET',
    path: '/tag_user/tag/{tagId}',
    config: getAuthWithScope('user'),
    handler: getUsersInTag,
  },
  {
    method: 'GET',
    path: '/tags_user/likes/{tagId}',
    config: getAuthWithScope('user'),
    handler: countTagLikes,
  },
  {
    method: 'GET',
    path: '/tags_user/taglist',
    config: getAuthWithScope('user'),
    handler: getTagList,
  },
  {
    method: 'GET',
    path: '/tags_user/{tagId}',
    config: getAuthWithScope('user'),
    handler: getTagsUser,
  },

  // Add new tag to a user
  // Love is a boolean. True = love, false = hate the tag.
  {
    method: 'POST',
    path: '/user_tag',
    config: merge({}, validateUserTagFields, getAuthWithScope('user')),
    handler: createUserTag,
  },
  //  Delete a tag that is connected to a user
  // @todo check if the OWNER is deleting this,
  // and not another user (somehow we can't to get details of authenticated user, ask rasmus
  {
    method: 'DELETE',
    path: '/user_tag',
    config: merge({}, validateUserTagFields, getAuthWithScope('user')),
    handler: delUserTag,
  },
];

export default tags;

// Here we register the routes
export const routes = server => server.route(tags);
