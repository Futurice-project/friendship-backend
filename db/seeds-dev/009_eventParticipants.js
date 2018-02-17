const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
const moment = require('moment');
let userId = 1;
let eventId = 0;
const eventParticipantsFields = {
  createdAt: moment(),
  userId: () => {
    userId += 1;
    if (userId > 4) {
      eventId = 1;
    } else {
      eventId = 0;
    }
    return userId;
  },
  eventId: () => {
    eventId += 1;
    return eventId;
  },
};
exports.seed = knex =>
  knex.batchInsert(
    'eventParticipants',
    simpleFixtures.generateFixtures(eventParticipantsFields, 8),
  );
