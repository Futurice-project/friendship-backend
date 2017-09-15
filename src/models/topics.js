import knex from '../utils/db';

const topicListFields = ['id', 'name'];

export const dbGetTopics = () => knex('topics').select(topicListFields);

export const dbGetTopic = id =>
  knex('topics')
    .first()
    .where({ id });
