import knex from '../utils/db';

const topicListFields = ['id', 'name'];

export const dbGetTopics = () => knex('topics').select(topicListFields);
