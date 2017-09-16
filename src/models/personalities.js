import knex from '../utils/db';

const personalityFields = ['id', 'name'];

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

// export const dbCreatePersonality = name =>
//   knex.transaction((trx) => {
//     const personality = { name };
//     return trx.insert(personality).into('personalities');
//   }).then(() => console.log('Done'))
//   .catch(error => console.log(error));

export const dbCreatePersonality = ({ ...fields }) =>
  knex.transaction(trx =>
    knex('personalities')
      .transacting(trx)
      .insert(fields)
      .returning('*')
      .then(results => results[0]),
  );

// export const dbCreatePersonality = name =>
//   knex('personalities')
//     .insert({ name })
