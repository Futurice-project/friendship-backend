import knex from '../utils/db';

const topicListFields = ['id', 'name'];
const userTopicListFields = ['id', 'love'];

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

export const dbUpdateTopic = (id, fields) =>
  knex('topics')
    .update({ ...fields })
    .where({ id })
    .returning('*');


//  Get all topics that a user has chosen to be either loved or hated
export const dbGetUserTopics= id =>
  knex('user-topic')
    .select(userTopicListFields)
    .where({ id });

// Add a new topic that a user loves/hates
export const dbCreateUserTopic= ({ ...fields }) =>
  knex.transaction(async (trx) => {
    const topic = await trx('user-topic')
      .insert(fields)
      .returning('*')
      .then(results => results[0]); // return only first result

    return topic;
  });


//  Delete a user-topic
export const dbDelUserTopic = id =>
  knex('user-topic')
    .where({ id })
    .del();
