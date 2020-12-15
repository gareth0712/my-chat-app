const logger = require('./logger');

const broadcast = (from, sockets, message) => {
  // If there are no sockets, then don't broadcast any messages
  if (sockets.length === 0) {
    logger.info('Everyone left the chat');
    return;
  }

  // If there are clients remaining then broadcast message
  sockets.forEach(function (socket) {
    if (socket.nickname === from) return;
    // Send messages to other receivers
    return socket.write(message);
  });
};

module.exports = broadcast;
