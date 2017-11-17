import knex from '../utils/db';
import moment from 'moment';

export const dbGetNbMatchesMessaging = () => {
  return -1;
}

export const dbGetNbMessagesByConversation = () => {
  return -1;
}

export const dbGetNbMessages = () => {
  return -1;
}

export const dbGetNbActiveUsers = () => {
  return -1;
}

export const dbGetUsersRegistered = () => {
  return knex.raw(`SELECT COUNT(users.id) as users_count, (SELECT COUNT(users.id) FROM "users" WHERE "users"."createdAt" >= to_timestamp(${moment().startOf('day').unix()}) AND "users"."createdAt" <= to_timestamp(${moment().endOf('day').unix()})) as registered_today from users`).then(results => results.rows);
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
