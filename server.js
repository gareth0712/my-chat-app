const server = require('net').createServer();
const dotenv = require('dotenv');

const { userInputListener, endListener, errorListener } = require('./listeners/socketListener');
const logger = require('./utils/logger');

dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

let id = 0;

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

// Server Error listener
server.on('error', (err) => {
  logger.error(`error occurred: ${err.message}`);
  logger.error(err);
});

server.listen(port, host, () => {
  logger.info('Server is ready to be connect through localhost:3000');
});
