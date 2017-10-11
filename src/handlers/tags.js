import Boom from 'boom';

import {
  dbGetTags,
  dbGetTag,
  dbCreateTag,
  dbDelTag,
  dbUpdateTag,
  dbCreateUserTag,
  dbGetUserTags,
  dbGetTagsUser,
  dbGetCountLikes,
  dbDelUserTag,
  dbGetTagsForUser,
  dbGetTagList,
  dbGetUsersInTag,
} from '../models/tags';

export const getTags = (request, reply) => dbGetTags().then(reply);

export const getTag = (request, reply) => dbGetTag(request.params.tagId).then(reply);

export const getTagsForUser = (request, reply) =>
  dbGetTagsForUser(request.params.userId).then(reply);

export const addTag = (request, reply) =>
  dbCreateTag({
    ...request.payload,
    name: request.payload.name,
  }).then(reply);

// delete this will affect FK in user_personality --> ask Futurice?
export const delTag = (request, reply) => dbDelTag(request.params.tagId).then(reply);

export const updateTag = async (request, reply) => {
  if (request.pre.user.scope !== 'admin') {
    return reply(Boom.unauthorized('Unprivileged users cannot update personality'));
  }

  const fields = {
    name: request.payload.name,
  };

  return dbUpdateTag(request.params.tagId, fields).then(reply);
};

/**
 * Use the userId of current user (get it trough the token) and adds a new tag to the user with a love value of either true or false
 * @param request.payload.love This value should be true if the user loves the tag and false if the user hates the tag.
 * @param request.payload.tagId The tagId that has to be added to a certain user
 * @param reply
 */
export const createUserTag = (request, reply) => {
  if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
    return reply(Boom.unauthorized('Cannot update other users!'));
  }

  return dbCreateUserTag({
    ...request.payload,
    userId: request.payload.userId,
    tagId: request.payload.tagId,
    love: request.payload.love,
  })
    .then(reply)
    .catch((err) => {
      if (err.constraint) {
        reply(Boom.conflict('Constraint Error: ', err));
      } else {
        reply(Boom.badImplementation(err));
      }
    });
};
export const getUsersInTag = (request, reply) => dbGetUsersInTag(request.params.tagId).then(reply);
// Get all tags of a user
export const getUserTags = (request, reply) => dbGetUserTags(request.params.userId).then(reply);
// get all users of tags
export const getTagsUser = (request, reply) => dbGetTagsUser(request.params.tagId).then(reply);

export const countTagLikes = (request, reply) => dbGetCountLikes(request.params.tagId).then(reply);

export const getTagList = (request, reply) => dbGetTagList().then(reply);

// Delete a tag that is connected to a user
export const delUserTag = (request, reply) => {
  if (request.pre.user.id !== parseInt(request.payload.userId, 10)) {
    return reply(Boom.unauthorized('Cannot update other users!'));
  }

  return dbDelUserTag(request.payload.userId, request.payload.tagId).then(reply);
};
