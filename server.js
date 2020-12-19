const server = require('net').createServer();
const dotenv = require('dotenv');
const getIpAddress = require('./utils/network');

const { serverConnectionListener, serverCloseListener, serverErrorListener } = require('./listeners/server-listeners');
const logger = require('./utils/logger');

dotenv.config({ path: './config/config.env' });

(async () => {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || 'localhost';
  const ipAddress = await getIpAddress();

  serverConnectionListener(server);
  serverErrorListener(server);
  serverCloseListener(server);

  server.listen(port, host, () => {
    console.log(`Server is up and can be connected through ${ipAddress}:3000`);
    logger.info(`Server is up and can be connected through ${ipAddress}:3000`);
  });
})();
