const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');
const moment = require('moment');

const eventParticipantsFields = {
  createdAt: moment(),
  userId: 1,
  eventId: 1,
};
exports.seed = knex =>
  knex.batchInsert(
    'eventParticipants',
    simpleFixtures.generateFixtures(eventParticipantsFields, 8),
  );
