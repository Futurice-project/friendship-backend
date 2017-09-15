import knex from '../utils/db';

const topicListFields = ['id', 'name'];

export const dbGetTopics = () => knex('topics').select(topicListFields);

export const dbGetTopic = id =>
  knex('topics')
    .first()
    .where({ id });

export const dbCreateTopic= ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const topic = await trx('topics')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return topic;
  });

export const dbDelTopic = id =>
  knex('topics')
    .where({ id })
    .del();

