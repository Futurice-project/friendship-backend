const faker = require('faker/locale/en');

exports.seed = knex =>
knex('messages')
  .then(() =>
    knex('chatrooms').select()
  )
  .then((chatrooms) => {
    const messages = [];

    chatrooms.forEach(chatroom =>
      [...Array(faker.random.number(5))].forEach(() =>
        messages.push({
          textMessage: faker.lorem.sentences(),
          chatroomId: chatroom.id,
          userId: Math.random > 0.5 ? chatroom.userCreatorId : chatroom.userReceiverId,
        }),
      ),
    );

    return knex.batchInsert(
      'messages',
      messages,
    );
  });
