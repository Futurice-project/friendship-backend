const email = require('emailjs');

const server = email.server.connect({
  user: 'haagahelia.friendshipapp@gmail.com',
  password: 'Futurice1234',
  host: 'smtp.gmail.com',
  ssl: true,
});

export const sendVerificationEmail = (emailHash, toEmail) => {
  const message = {
    text: `Please verify your email from FriendShip App: http://localhost:3888/users/verify/${emailHash}`,
    from: 'FriendShip App <haagahelia.friendshipapp@gmail.com>',
    to: toEmail,
    subject: 'Please verify your email from FriendShip App',
    attachment: [
      {
        data: `<html>
        <h2>Click the link below to verify your email</h2>
        <a href="http://localhost:3888/users/verify/${emailHash}">Verify Email</a>
        </html>`,
        alternative: true,
      },
    ],
  };
  server.send(message, (err, mess) => {
    console.log(err || mess);
  });
};

