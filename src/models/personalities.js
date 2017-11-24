import knex from '../utils/db';

const personalityFields = ['id', 'name'];
const userPersonalityFields = ['userId', 'personalityId', 'level', 'name'];

export const dbGetPersonalities = () => knex('personalities').select(personalityFields);

export const dbGetPersonality = id =>
  knex('personalities')
    .first()
    .where({ id });

export const dbUpdatePersonality = (id, fields) =>
  knex('personalities')
    .update({ ...fields })
    .where({ id })
    .returning('*');

export const dbDelPersonality = id =>
  knex('personalities')
    .where({ id })
    .del();

export const dbCreatePersonality = ({ ...fields }) =>
  knex.transaction(trx =>
    knex('personalities')
      .transacting(trx)
      .insert(fields)
      .returning('*')
      .then(results => results[0]),
  );

export const dbGetUserPersonalities = userId =>
  knex('user_personality')
    .select(userPersonalityFields)
    .join('personalities', 'user_personality.personalityId', '=', 'personalities.id')
    .where({ userId })
    .andWhere({ level: '5' });

export const dbUpdateUserPersonality = (userId, personalityId, fields) =>
  knex('user_personality')
    .update({ ...fields })
    .where({ userId, personalityId })
    .returning('*');

export const dbCreateUserPersonality = ({ ...fields }) =>
  knex.transaction(trx =>
    knex('user_personality')
      .transacting(trx)
      .insert(fields)
      .returning('*')
      .then(results => results[0]),
  );

export const dbCreateUserPersonalities = (userId, personalityArray) =>
  knex.transaction(async (trx) => {
    await trx('user_personality')
      .where({ userId })
      .returning('*')
      .del()
      .then();

    const userPersonalities = await trx('user_personality')
      .insert(personalityArray)
      .returning('*')
      .then(results => results);

    return userPersonalities;
  });
