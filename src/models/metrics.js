import knex from '../utils/db';
import moment from 'moment';

export const dbGetNbMatchesMessaging = () => {
  return -1;
}

export const dbGetAvgChatroomsPerUser = () => {
  return knex.raw(`SELECT CAST((SELECT COUNT(users.id) FROM users) AS DECIMAL) / ( SELECT COUNT(chatrooms.id) AS DECIMAL) FROM chatrooms);`)
}

export const dbGetNbMessagesByConversation = () => knex.raw('SELECT CAST(COUNT(id) / COUNT(DISTINCT chatroom_id) AS DECIMAL) FROM messages;');

export const dbGetNbMessages = () => {
  return -1;
}

export const dbGetNbActiveUsers = () => {
  return knex.raw(`SELECT COUNT(id) as active_users WHERE last_active >= to_timestamp(${moment().startOf('day').unix()}) AND last_active <= to_timestamp(${moment().endOf('day').unix()}) FROM users`).then(results => results.rows);
}

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