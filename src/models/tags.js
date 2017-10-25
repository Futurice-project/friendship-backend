import knex from '../utils/db';

const tagListFields = ['id', 'user_id', 'name', 'category', 'createdAt'];
const userTagListFields = ['userId', 'tagId', 'love'];

export const dbGetTags = () => knex('tags').select(tagListFields);

export const dbGetTag = id =>
  knex('tags')
    .first()
    .where({ id });

export const dbCreateTag = ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const tag = await trx('tags')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return tag;
  });

export const dbDelTag = id =>
  knex('tags')
    .where({ id })
    .del();

export const dbUpdateTag = (id, fields) =>
  knex('tags')
    .update({ ...fields })
    .where({ id })
    .returning('*');


//  Get all tags that a user has chosen to be either loved or hated
export const dbGetUserTags = userId =>
  knex('user_tag')
    .select(userTagListFields)
    .where({ userId });

// Get all the users of a tag, used in admin to check how many loves/hates a tag has
export const dbGetTagsUser = tagId =>
  knex('user_tag')
    .select(userTagListFields)
    .where({tagId});

export const dbGetCountLikes = tagId =>
  knex('user_tag')
    .where({tagId})
    .groupBy('love')
    .countDistinct('userId');

// Add a new tag that a user loves/hates
export const dbCreateUserTag = ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const tag = await trx('user_tag')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return tag;
  });

  export const dbGetTagList = () =>
    knex.raw(`SELECT DISTINCT("tags"."id"), "tags"."name",
(SELECT COUNT("user_tag"."love") AS "nbLoves" FROM "user_tag"
WHERE "user_tag"."love" = TRUE),
(SELECT COUNT("user_tag"."love") AS "nbHates" FROM "user_tag"
WHERE "user_tag"."love" = FALSE),
"tags"."user_id" AS "creator", "tags"."createdAt"
FROM "tags"
left join "user_tag"
ON "tags"."id" = "user_tag"."userId"
ORDER BY "tags"."createdAt" DESC;`).then(results => results.rows);
//});

//  Delete a tag cascading when a tag gets deleted
export const dbDelTagUser = tagId =>
  knex('user_tag')
    .where({ tagId })
    .del();

//  Delete a tag cascading from the user side
export const dbDelUserTag = userId =>
  knex('user_tag')
      .where({ userId })
      .del();
