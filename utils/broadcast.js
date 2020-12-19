const logger = require('./logger');

const broadcast = (from, sockets, message) => {
  // If there are no sockets, then don't broadcast any messages
  if (sockets.length === 0) {
    logger.info('Everyone left the chat');
    return;
  }

  // Check if "@mentioned" is used
  const regex = /(@[0-9A-Za-z-_]*)/g;
  let mentionedNicknames = message.match(regex);
  if (mentionedNicknames) {
    mentionedNicknames = mentionedNicknames.map((el) => el.replace('@', ''));
  }

  // If there are clients remaining then broadcast message
  sockets.forEach(function (socket) {
    if (mentionedNicknames && mentionedNicknames.includes(socket.nickname)) {
      socket.write('\x07');
    }
    if (socket.nickname === from) return;

    // Send messages to other receivers
    return socket.write(message);
  });
};

module.exports = broadcast;
