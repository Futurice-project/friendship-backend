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
          text_message: faker.lorem.sentences(),
          chatroom_id: chatroom.id,
          user_id: Math.random > 0.5 ? chatroom.userCreatorId : chatroom.userReceiverId,
        }),
      ),
    );

    return knex.batchInsert(
      'messages',
      messages,
    );
  });
