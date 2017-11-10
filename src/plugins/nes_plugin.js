exports.register = (server, options, next) => {  
  server.subscription('/chatrooms/{id}');
  //const publishmessage = server.publish(`/api/chatroom/${roomId}`, message)
  next();
};

exports.register.attributes = {
  name: 'Nesplugin',
  version: '1.0.0',
};
