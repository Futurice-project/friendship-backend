import knex from '../utils/db';
import moment from 'moment';

// Returns total number of matches that are messaging
export const dbGetNbMatchesMessaging = () => {
  return -1;
}

// Returns average number of chatrooms per user
export const dbGetAvgChatroomsPerUser = () => {
  return knex.raw(`SELECT CAST((SELECT COUNT(users.id) FROM users) AS DECIMAL) / ( SELECT COUNT(chatrooms.id) AS DECIMAL) FROM chatrooms);`)
}

// Returns average number of messages per conversation
export const dbGetNbMessagesByConversation = () => knex.raw('SELECT CAST(COUNT(id) / COUNT(DISTINCT chatroom_id) AS DECIMAL) FROM messages; ');

// Returns total number of messages
export const dbGetNbMessages = () => {
  return knex.raw(`SELECT COUNT(id) FROM messages`);
}

/** Returns total number of users that opened the application this day
  * Is executed automactically today
*/
export const dbGetNbActiveUsers = () => {
  return knex.raw(`SELECT COUNT(users.id) AS active_users WHERE last_active >= to_timestamp(${moment().startof('day').unix()}) AND last_active <= to_timestamp(${moment().endof('day').unix()}) FROM users`).then(results => results.rows);
}

/** Returns the number of users registered this day
  * Is executed automatically each day
*/
export const dbGetUsersRegistered = () => {
  return knex.raw(`SELECT COUNT(users.id) as users_count, (SELECT COUNT(users.id) FROM "users" WHERE "users"."createdAt" >= to_timestamp(${moment().startOf('day').unix()}) AND "users"."createdAt" <= to_timestamp(${moment().endOf('day').unix()})) as registered_today from users`).then(results => results.rows);
}

export const dbInsertActiveUsers = (data) => {
  const fields = {
    active_users: parseInt(data.active_users, 0),
    timestamp: moment().utc().toISOString()
  }

  return knex.transaction((tx) => {
    return tx.insert(fields)
      .into('metrics_active_users')
      .then((id) => {
        console.log("Active users for today inserted");

        return id;
      })
      .catch((err) => {
        console.log("Insert failed", err);
        throw err;
      })
  })
    .catch((err) => {
      console.log("Huh! Transaction failed!", err);
      throw err;
    });
}

export const dbInsertUsersRegistered = (data) => {

  const fields = {
    users_count: parseInt(data.users_count, 0),
    registered_today: parseInt(data.registered_today, 0),
    timestamp: moment().utc().toISOString()
  }

  // knex('metrics_users_registered')
  //     .insert(fields)
  //     .returning('*');

  return knex.transaction((tx) => {
    return tx.insert(fields)
      .into('metrics_users_registered')
      .then((id) => {
        console.log("User registration for today inserted");

        return id;
      })
      .catch((err) => {
        console.log("Insert failed", err);
        throw err;
      })
  })
    .catch((err) => {
      console.log("Huh! Transaction failed!", err);
      throw err;
    });
}

export const dbgetMetricsRegisteredUsers = () => {
  return knex('metrics_users_registered').select('*');
}