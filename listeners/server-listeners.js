const { userInputListener, endListener, errorListener } = require('./socket-listeners');
const logger = require('../utils/logger');

let id = 0;

const serverConnectionListener = (server) => {
  server.on('connection', (socket) => {
    // Assign an independent id to each socket upon connection
    id += 1;
    socket.id = id;

    logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort} establishes to the chat server`);
    logger.info(`ID ${socket.id} is assigned to the new joiner`);

    // Greet the user
    socket.write('< Welcome to my chat server! What is your nickname?\n');

    userInputListener(socket);
    endListener(socket);
    errorListener(socket);
  });
};

const serverErrorListener = (server) => {
  server.on('error', (err) => {
    logger.error(`error occurred: ${err.message}`);
    logger.error(err);
  });
};

const serverCloseListener = (server) => {
  server.on('close', () => {
    logger.info('Server closed');
  });
};

module.exports = {
  serverConnectionListener,
  serverErrorListener,
  serverCloseListener,
};
