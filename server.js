const server = require('net').createServer();
const dotenv = require('dotenv');

const broadcast = require('./utils/broadcast');
const logger = require('./utils/logger');
const { addMessages, showHistoricalMessages } = require('./utils/handle-messages');
const { doesNameExist, getNicknames, isValidName } = require('./utils/validator');
const { messageWithTime } = require('./utils/time');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const sockets = [];
const historicalMessages = [];
let id = 0;

// Remove disconnected client from sockets array
const removeSocket = (socket) => {
  sockets.splice(sockets.indexOf(socket), 1);
};

server.on('connection', (socket) => {
  // Assign an independent id to each socket upon connection
  id += 1;
  socket.id = id;

  logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort} establishes to the chat server`);
  logger.info(`ID ${socket.id} is assigned to the new joiner`);

  // Greet the user
  socket.write('< Welcome to my chat server! What is your nickname?\n');

  // Input listener
  socket.on('data', (data) => {
    // User Exit server
    const dataStr = data.toString().trim();
    if (dataStr === '.exit') {
      return socket.end();
    }

    // Request user to enter a nickname
    if (socket.nickname === undefined) {
      // Check if name contains special characters or space
      if (!isValidName(dataStr)) {
        return socket.write(`Empty name, spaces and special characters are not allowed for nickname, except '-' and '_'.\n`);
      }
      // Check if the name is taken
      if (!doesNameExist(dataStr, sockets)) {
        socket.nickname = dataStr;
        logger.info(`User with ID ${socket.id} has taken a nickname "${socket.nickname}"`);

        // Let user know the existing users in chat server
        if (sockets.length !== 0) {
          const nicknames = getNicknames(sockets);
          socket.write(`You are connected with ${nicknames.length} ${nicknames.length > 1 ? 'other users' : 'user'}: [${nicknames.join(', ')}]\n`);
        } else {
          socket.write(`${messageWithTime()} *You are the first joiner of the chat server!*\n`);
        }

        showHistoricalMessages(socket, historicalMessages);

        // Broadcast to existing users of new joiner
        sockets.push(socket);
        const message = `${messageWithTime()} *<${socket.nickname}> has joined the chat*\n`;
        return broadcast(socket.nickname, sockets, message);
      }
      return socket.write('Your desired nickname has already been taken. Please choose another name.\n');
    }

    const message = `${messageWithTime()} <${socket.nickname}> ${dataStr}\n`;
    addMessages(message, historicalMessages);
    return broadcast(socket.nickname, sockets, message);
  });

  // Socket End listener
  socket.on('end', () => {
    removeSocket(socket);
    logger.info(`User with nickname ${socket.nickname} of ID ${socket.id} disconnected from server`);
    broadcast(socket.nickname, sockets, `${messageWithTime()} *<${socket.nickname}> left the chat server.*\n`);
  });

  // Socket Error listener
  socket.on('error', (err) => {
    socket.write('Error occurred in the chat server.');
    logger.error(`error occurred: ${err.message}`);
    logger.error(err);
  });
});

// Server Error listener
server.on('error', (err) => {
  logger.error(`error occurred: ${err.message}`);
  logger.error(err);
});

server.listen(port, host, () => {
  console.log(`TCP Server is up on port ${port}`);
});
