import knex from '../utils/db';

const eventParticipantFields = ['id', 'createdAt', 'userId', 'eventId'];

export const dbGetEventParticipants = async (eventId, userId) => {
  const groupPersonality = await knex.raw(`

  `);

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

export const dbGetEventPerssonality = async eventId => {
  const topEventPersonalities = await knex.raw(`SELECT "name", COUNT("eventParticipants"."userId")  as "Number_of_Personalities"   FROM events
  JOIN "eventParticipants" ON events.id = "eventParticipants"."eventId"
  JOIN "user_personality"  ON "user_personality"."userId" =  "eventParticipants"."userId"
  JOIN "personalities" ON "user_personality"."personalityId" = "personalities"."id"
  WHERE "eventParticipants"."eventId" = ${eventId}
  GROUP BY "personalities"."name"
  ORDER BY "Number_of_Personalities" DESC
  LIMIT 3`);
  return topEventPersonalities;
};

export const dbGetEventTopYeahsNahs = async eventId => {
  const topEventYeahs = await knex.raw(`SELECT "tags"."name", COUNT("eventParticipants"."userId")  FROM events
    JOIN "eventParticipants" ON events.id = "eventParticipants"."eventId"
    JOIN "user_tag"  ON "user_tag"."userId" =  "eventParticipants"."userId"
    JOIN "tags" ON "tags"."id" = "user_tag"."tagId"
    WHERE "eventParticipants"."eventId" = ${eventId}
    AND "user_tag".love = true
    GROUP BY "tags"."name"
    ORDER BY COUNT DESC
    LIMIT 3`);

  const topEventNahs = await knex.raw(`SELECT "tags"."name", COUNT("eventParticipants"."userId")  FROM events
    JOIN "eventParticipants" ON events.id = "eventParticipants"."eventId"
    JOIN "user_tag"  ON "user_tag"."userId" =  "eventParticipants"."userId"
    JOIN "tags" ON "tags"."id" = "user_tag"."tagId"
    WHERE "eventParticipants"."eventId" = ${eventId}
    AND "user_tag".love = false
    GROUP BY "tags"."name"
    ORDER BY COUNT DESC
    LIMIT 3`);
  topEventYeahs.rows.map(yeah => {
    yeah.love = true;
  });
  topEventNahs.rows.map(nah => {
    nah.love = false;
  });
  const topYeahsNahs = topEventYeahs.rows.concat(topEventNahs.rows);

  return topYeahsNahs;
};

export const dbCreateEventParticipation = ({ ...fields }) =>
  knex.transaction(trx =>
    knex('eventParticipants')
      .transacting(trx)
      .insert(fields)
      .returning('*')
      .then(results => results[0]),
  );

export const dbGetEventParticipation = async (eventId, userId) => {
  const eventParticipanion = await knex.raw(
    `SELECT "id" FROM "eventParticipants" WHERE "eventId" = ${eventId} AND "userId" = ${userId}`,
  );
  if (eventParticipanion.rows.length >= 1) {
    return true;
  } else {
    return false;
  }
};

export const dbDelEventParticipation = (eventId, userId) =>
  knex('eventParticipants')
    .where({ userId })
    .andWhere({ eventId })
    .del();
