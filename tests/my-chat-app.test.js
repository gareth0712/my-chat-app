const net = require('net');
const dotenv = require('dotenv');
const { userInputListener, endListener, errorListener } = require('../listeners/socketListener');

dotenv.config({ path: './config/test.env' });

const server = net.createServer();
const client = new net.Socket();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

console.log(`current environment is: ${process.env.NODE_ENV}`);
// Set up TCP server
beforeAll((done) => {
  server.listen(port, host);
  server.on('connection', (socket) => {
    socket.write('halo');
    userInputListener(socket);
    endListener(socket);
    errorListener(socket);
  });
  done();
});

afterAll((done) => {
  if (client.connected) {
    client.disconnect();
    console.log('why am i still stuck');
    client.destroy();
  }
  server.removeAllListeners();
  server.close();
  done();
});

// beforeEach((done) => {
//   done();
// });

// afterEach((done) => {
//   done();
// });

describe('my-chat-app tests', () => {
  test('should connect', (done) => {
    client.on('data', (data) => {
      expect(data.toString()).toBe('halo');
    });
    // once connected, should be asked for nickname
    client.connect(port, host);
    done();
  });
});
