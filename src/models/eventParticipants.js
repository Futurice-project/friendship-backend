import knex from '../utils/db';

const eventParticipantFields = ['id', 'createdAt', 'userId', 'eventId'];

export const dbGetEventParticipants = async (eventId, userId) => {
  const hateCommonLoveCommon = await knex.raw(`SELECT "users"."id","users"."emoji","users"."username",
    count(DISTINCT "tags"."name") AS "hateCommon"
    FROM "users"
    left join "user_tag"
    ON "user_tag"."userId" = "users"."id"
    left join "tags"
    ON "tags"."id" = "user_tag"."tagId"
    WHERE "user_tag"."love" = ${false}
    AND "users"."id" != ${userId}
    AND "users"."id" IN (SELECT "users"."id"  FROM "users"
          left join "eventParticipants"
          ON "eventParticipants"."userId" = "users"."id"
          left join "events"
          ON "events"."id" = "eventParticipants"."eventId"
          WHERE "eventParticipants"."eventId" = ${eventId})
    AND "tags"."name" IN (SELECT "tags"."name" FROM "user_tag"
                      left join "tags" ON "tags"."id" = "user_tag"."tagId"
                      WHERE "user_tag"."userId" = ${userId}
                      AND "user_tag"."love" = ${false})
    GROUP BY "users"."id"`);

  const loveCommon = await knex.raw(`SELECT "users"."id","users"."username",
      count(DISTINCT "tags"."name") AS "loveCommon"
      FROM "users"
      left join "user_tag"
      ON "user_tag"."userId" = "users"."id"
      left join "tags"
      ON "tags"."id" = "user_tag"."tagId"
      WHERE "user_tag"."love" = ${true}
      AND "users"."id" != ${userId}
      AND "users"."id" IN (SELECT "users"."id"  FROM "users"
            left join "eventParticipants"
            ON "eventParticipants"."userId" = "users"."id"
            left join "events"
            ON "events"."id" = "eventParticipants"."eventId"
            WHERE "eventParticipants"."eventId" = ${eventId})
      AND "tags"."name" IN (SELECT "tags"."name" FROM "user_tag"
                        left join "tags" ON "tags"."id" = "user_tag"."tagId"
                        WHERE "user_tag"."userId" = ${userId}
                        AND "user_tag"."love" = ${true})
      GROUP BY "users"."id"`);

  hateCommonLoveCommon.rows.map(hate => {
    loveCommon.rows.map(love => {
      if (love.id === hate.id) {
        hate.loveCommon = love.loveCommon;
      }
    });
  });
  return hateCommonLoveCommon;
};

/*export const dbGetEventParticipants = async (eventId, userId) => {
  const participants = await knex.raw(`SELECT "users"."username", "tags"."name", "user_tag"."love"  FROM "users"
        left join "eventParticipants"
        ON "eventParticipants"."userId" = "users"."id"
        left join "events"
        ON "events"."id" = "eventParticipants"."eventId"
        left join "user_tag"
        ON "user_tag"."userId" = "users"."id"
        left join "tags"
        ON "tags"."id" = "user_tag"."tagId"
        WHERE "eventParticipants"."eventId" = ${eventId}`);
  userId = '1';
  const users = await knex.raw(`SELECT "users"."username", "tags"."name", "user_tag"."love"  FROM "users"
        left join "user_tag"
        ON "user_tag"."userId" = "users"."id"
        left join "tags"
        ON "tags"."id" = "user_tag"."tagId"
        WHERE "users"."id" = ${userId} `);

  users.rows.map(user => {
    console.log(user);
  });

  participants.rows.map(participant => {
    console.log(participant);
  });
  return participants;
};*/

export const dbCreateEventParticipation = ({ ...fields }) =>
  knex.transaction(trx =>
    knex('eventParticipants')
      .transacting(trx)
      .insert(fields)
      .returning('*')
      .then(results => results[0]),
  );

export const dbGetEventParticipation = (eventId, userId) =>
  knex('eventParticipants')
    .select(eventParticipantFields)
    .where({ userId })
    .andWhere({ eventId });

export const dbDelEventParticipation = (eventId, userId) =>
  knex('eventParticipants')
    .where({ userId })
    .andWhere({ eventId })
    .del();
