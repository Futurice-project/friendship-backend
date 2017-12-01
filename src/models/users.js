import knex from '../utils/db';
import { sendVerificationEmail } from '../utils/email';

const crypto = require('crypto');

const userListFields = [
  'users.id',
  'createdAt',
  'email',
  'scope',
  'username',
  'description',
  'emoji',
  'compatibility',
  'active',
  'birthyear',
  'status',
  'image',
];

export const dbGetUsers = () =>
  knex('users')
    .leftJoin('banned_users', 'banned_users.user_id', 'users.id')
    .select(userListFields)
    .count('banned_users.id as isbanned')
    .groupBy('users.id')
    .orderBy('users.id', 'asc');

export const dbGetFilteredUsers = filter =>
  knex('users')
    .where('username', 'like', `%${filter.username}%`)
    .orWhere('email', 'like', `%${filter.email}%`)
    .select(userListFields)
    .orderBy('id', 'asc');

export const dbGetUsersBatch = async (pageNumber, userId) => {
  const pageLimit = 10;
  // knex('users')
  //   .select(userListFields)
  //   .limit(pageLimit)
  //   .offset(pageNumber * pageLimit)
  //   .where('id', '!=', userId);

  const users = await knex.raw(`
    WITH "UserLoveCommon"
    AS (SELECT "users"."id","users"."createdAt","email","scope",
    "username","description","emoji","active","birthyear","status",
    count(DISTINCT "tags"."name") AS "loveCommon", array_agg(DISTINCT "genders"."gender") AS "genderlist"
    FROM "users"
      left join "user_gender"
      ON "user_gender"."userId" = "users"."id"
      left join "genders"
      ON "genders"."id" = "user_gender"."genderId"
        left join "user_tag"
        ON "user_tag"."userId" = "users"."id"
        left join "tags"
        ON "tags"."id" = "user_tag"."tagId"
    WHERE "user_tag"."love" = `+ true + `
    AND "users"."id" != ` + userId + `
    AND "tags"."name" IN (SELECT "tags"."name" FROM "user_tag"
                      left join "tags" ON "tags"."id" = "user_tag"."tagId"
                      WHERE "user_tag"."userId" = ` + userId + `
                      AND "user_tag"."love" =`+ true +`)
    GROUP BY "users"."id"
    LIMIT ` + pageLimit + `
    OFFSET ` + (pageNumber * pageLimit) + `),

    "UserHateCommon"
    AS (SELECT "users"."id" as "userHateId",
    count(DISTINCT "tags"."name") AS "hateCommon"
    FROM "users"
        left join "user_tag"
        ON "user_tag"."userId" = "users"."id"
        left join "tags"
        ON "tags"."id" = "user_tag"."tagId"
    WHERE "user_tag"."love" = `+ false + `
    AND "users"."id" != ` + userId + `
    AND "tags"."name" IN (SELECT "tags"."name" FROM "user_tag"
                      left join "tags" ON "tags"."id" = "user_tag"."tagId"
                      WHERE "user_tag"."userId" = ` + userId + `
                      AND "user_tag"."love" =`+ false +`)
    GROUP BY "users"."id"
    LIMIT ` + pageLimit + `
    OFFSET ` + (pageNumber * pageLimit) + `),

    "UserLocation"
    AS (SELECT "users"."id" as "userId",
    array_agg(DISTINCT "locations"."name") AS "locations"
    FROM "users"
        left join "user_location"
        ON "user_location"."userId" = "users"."id"
        left join "locations"
        ON "locations"."id" = "user_location"."locationId"
    WHERE "users"."id" != ` + userId + `
    GROUP BY "users"."id"
    LIMIT ` + pageLimit + `
    OFFSET ` + (pageNumber * pageLimit) + `)

    SELECT "id","createdAt","email","scope","username","description","emoji","active",
    "birthyear","status","genderlist","loveCommon","hateCommon","locations"
    FROM "UserLoveCommon"
    left join "UserHateCommon"
    ON "UserLoveCommon"."id" = "UserHateCommon"."userHateId"
    left join "UserLocation"
    ON "UserLoveCommon"."id" = "UserLocation"."userId"
    `).then(results => results.rows);

  return users;
};

export const dbGetEmailVerification = hash =>
  knex('email_verification')
    .first()
    .where({ hash });

export const dbGetUser = async (userId, currentUserId) => {
  // const user = await knex('users')
  //   .leftJoin('banned_users', 'banned_users.user_id', 'users.id')
  //   .select(userListFields)
  //   .count('banned_users.id as isbanned')
  //   .groupBy('users.id')
  //   .first()
  //   .where('users.id', '=', id);

  const user = await knex.raw(`
    WITH "UserLoveCommon"
    AS (SELECT "users"."id","users"."createdAt","image","email","scope",
    "username","description","emoji","active","birthyear","status",
    count(DISTINCT "tags"."name") AS "loveCommon", array_agg(DISTINCT "genders"."gender") AS "genderlist"
    FROM "users"
      left join "user_gender"
      ON "user_gender"."userId" = "users"."id"
      left join "genders"
      ON "genders"."id" = "user_gender"."genderId"
        left join "user_tag"
        ON "user_tag"."userId" = "users"."id"
        left join "tags"
        ON "tags"."id" = "user_tag"."tagId"
    WHERE "user_tag"."love" = `+ true + `
    AND "users"."id" = ` + userId + `
    AND "tags"."name" IN (SELECT "tags"."name" FROM "user_tag"
                      left join "tags" ON "tags"."id" = "user_tag"."tagId"
                      WHERE "user_tag"."userId" = ` + currentUserId + `
                      AND "user_tag"."love" =`+ true +`)
    GROUP BY "users"."id"),

    "UserHateCommon"
    AS (SELECT "users"."id" as "userHateId",
    count(DISTINCT "tags"."name") AS "hateCommon"
    FROM "users"
        left join "user_tag"
        ON "user_tag"."userId" = "users"."id"
        left join "tags"
        ON "tags"."id" = "user_tag"."tagId"
    WHERE "user_tag"."love" = `+ false + `
    AND "users"."id" = ` + userId + `
    AND "tags"."name" IN (SELECT "tags"."name" FROM "user_tag"
                      left join "tags" ON "tags"."id" = "user_tag"."tagId"
                      WHERE "user_tag"."userId" = ` + currentUserId + `
                      AND "user_tag"."love" =`+ false +`)
    GROUP BY "users"."id"),

    "UserLocation"
    AS (SELECT "users"."id" as "userId",
    array_agg(DISTINCT "locations"."name") AS "locations"
    FROM "users"
        left join "user_location"
        ON "user_location"."userId" = "users"."id"
        left join "locations"
        ON "locations"."id" = "user_location"."locationId"
    WHERE "users"."id" = ` + userId + `
    GROUP BY "users"."id")

    SELECT "id","createdAt","image","email","scope","username","description","emoji","active",
    "birthyear","status","genderlist","loveCommon","hateCommon","locations"
    FROM "UserLoveCommon"
    left join "UserHateCommon"
    ON "UserLoveCommon"."id" = "UserHateCommon"."userHateId"
    left join "UserLocation"
    ON "UserLoveCommon"."id" = "UserLocation"."userId"
    LIMIT 1
    `).then(results => results.rows);

  // we convert the image in base 64 so we can display it in our app
  if (user[0].image) {
    user[0].image = user.image.toString('base64');
  }

  return user[0];
};

export const dbUpdatePassword = (id, hash) =>
  knex('secrets')
    .update({ password: hash })
    .where({ ownerId: id });

// export const dbGetUserWithContent = userId =>
//   knex('tags')
//     .leftJoin('user_tag', 'user_tag.tagId', 'tags.id')
//     .where({ 'user_tag.userId': userId });

export const dbGetUserByUsername = (username, userId) =>
  knex('users')
    .where('id', '!=', userId)
    .andWhere('username', 'like', `%${username}%`);

export const dbUpdateUser = (id, fields) =>
  knex('users')
    .update({ ...fields })
    .where({ id })
    .returning('*');

export const dbFetchUserBan = id => knex('banned_users').where('user_id', '=', id);

export const dbBanUser = (id, fields) => {
  fields = {
    ...fields,
    user_id: id,
  };

  return knex('banned_users')
    .returning('*')
    .insert(fields);
};

export const dbDelUser = id =>
  knex('users')
    .where({ id })
    .del();

export const dbDelVerificationHash = ownerId =>
  knex('email_verification')
    .where({ ownerId })
    .del();

export const dbCreateUser = ({ password, genders, ...fields }) =>
  knex.transaction(async (trx) => {
    const user = await trx('users')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    await trx('secrets')
      .insert({
        ownerId: user.id,
        password,
      })
      .then();

    const genderArray = [];
    if (genders) {
      genders.forEach((gender) => {
        genderArray.push({ userId: user.id, genderId: gender });
      });
    }

    await trx('user_gender')
      .insert(genderArray)
      .then();

    // console.log('Creating Hash');
    const hash = crypto.randomBytes(48).toString('hex');

    await trx('email_verification')
      .insert({
        ownerId: user.id,
        hash,
      })
      .then();

    // console.log('Sending Hash Email now to', user.email);
    // activate this here later
    // sendVerificationEmail(hash, user.email);

    return user;
  });
