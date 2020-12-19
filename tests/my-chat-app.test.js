const net = require('net');
const dotenv = require('dotenv');
const { serverConnectionListener, serverCloseListener, serverErrorListener } = require('../listeners/server-listeners');

dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

let server;
let clientOne;
let clientTwo;

const getAnnouncement = (data, index) => {
  const announcement = data.toString().match(/\*.*\*/g);
  if (announcement && index <= announcement.length - 1) return announcement[index];
  return null;
};

const getMessage = (data, index) => {
  const message = data.toString().match(/<[A-Za-z0-9-_]*>.*/g);
  if (message && index <= message.length - 1) return message[index];
  return null;
};

const sendMessageDelay = (client, message, ms) =>
  setTimeout(() => {
    client.write(message);
  }, ms);

// Set up TCP server
beforeAll((done) => {
  server = net.createServer();
  serverConnectionListener(server);
  serverErrorListener(server);
  serverCloseListener(server);
  clientOne = new net.Socket();
  clientTwo = new net.Socket();
  done();
});

// Close the server after testing
afterAll((done) => {
  server.removeAllListeners();
  // Calling unref() on a server will allow the program to exit if this is the only active server in the event system => Close server gracefully
  server.unref();
  done();
});

beforeEach((done) => {
  server.listen(port, host, () => {
    clientOne.connect(port, host);
    clientTwo.connect(port, host);
    done();
  });
});

afterEach((done) => {
  clientOne.removeAllListeners();
  clientTwo.removeAllListeners();
  clientTwo.destroy();
  clientOne.destroy();
  server.close(() => {
    server.unref();
    done();
  });
});

test('should ask for nickname upon successful connection', (done) => {
  clientOne.on('data', (data) => {
    expect(data.toString()).toBe('< Welcome to my chat server! What is your nickname?\n');
    done();
  });
  clientTwo.on('data', () => {});
});

test('should announce the first joiner upon nickname set', (done) => {
  clientOne.on('data', async (data) => {
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      await clientOne.write('Jason');
    } else {
      const announcement = getAnnouncement(data, 0);
      expect(announcement).toBe('*You are the first joiner of the chat server!*');
      done();
    }
  });
  clientTwo.on('data', () => {});
});

test('nickname cannot contain special characters', (done) => {
  clientOne.on('data', async (data) => {
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      await clientOne.write('$%');
    } else {
      expect(data.toString()).toBe("< Empty name, spaces and special characters are not allowed for nickname, except '-' and '_'.\n");
      clientOne.removeAllListeners();
      done();
    }
  });
  clientTwo.on('data', () => {});
});

// Rule 1 - broadcast message
test('broadcast message', (done) => {
  clientOne.on('data', async (data) => {
    const announcement = getAnnouncement(data, 1);
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      await clientOne.write('Jimmy');
    } else if (announcement === '*<Peter> has joined the chat*') {
      await clientOne.write('Hi Peter');
    }
  });

  clientTwo.on('data', async (dataTwo) => {
    const message = getMessage(dataTwo, 0);
    if (dataTwo.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      await clientTwo.write('Peter');
    } else if (message) {
      expect(message).toBe('<Jimmy> Hi Peter');
      done();
    }
  });
});

// Rule 2 - name must be unique and should tell user to choose a new nickname if it's taken
test('nickname must be unique', (done) => {
  clientOne.on('data', async (data) => {
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      await clientOne.write('Tim');
    }
  });

  clientTwo.on('data', async (dataTwo) => {
    if (dataTwo.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      // Make sure two enters the name after one does
      await clientTwo.write('Tim');
    } else {
      expect(dataTwo.toString()).toBe('< Your desired nickname has already been taken. Please choose another name.\n');
      done();
    }
  });
});

// Rule 3 - Broadcast that user has connected + send a list of users connected
test('broadcast user connected and send a list of users connected', (done) => {
  const messages = [...Array(10).keys()].map((i) => `Message ${Number(i + 1)}`);
  clientOne.on('data', async (data) => {
    const announcement = getAnnouncement(data, 0);
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      clientOne.write('Venus');
    } else if (announcement === '*You are the first joiner of the chat server!*') {
      for (const i in messages) {
        sendMessageDelay(clientOne, messages[i], (Number(i) + 1) * 100);
      }
    } else {
      expect(announcement).toBe('*<Sammi> has joined the chat*');
      done();
    }
  });

  clientTwo.on('data', async (dataTwo) => {
    if (dataTwo.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      // Wait 2s to ensure clientOne has already input 10 messages
      setTimeout(async () => {
        await clientTwo.write('Sammi');
      }, 2000);
    } else {
      const splittedMessages = dataTwo.toString().split('\n');
      const connectedMessage = splittedMessages[0];
      expect(connectedMessage).toBe('< You are connected with 1 user: [Venus]');
      let historicalMessages = splittedMessages.splice(2, splittedMessages.length - 3);
      historicalMessages = historicalMessages.map((message) => getMessage(message, 0));
      const expectedMessages = messages.map((message) => `<Venus> ${message}`);
      expect(historicalMessages).toEqual(expectedMessages);
    }
  });
});

// Rule 4 - Broadcast that user has disconnected
test('broadcast user disconnected', (done) => {
  clientOne.on('data', async (data) => {
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      clientOne.write('Kenny');
    } else if (getAnnouncement(data, 0) === '*<Ben> has joined the chat*') {
      clientOne.write('.exit');
    }
  });

  clientTwo.on('data', async (dataTwo) => {
    const announcement = getAnnouncement(dataTwo, 0);
    if (dataTwo.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      clientTwo.write('Ben');
    } else if (announcement && announcement.includes('Kenny')) {
      expect(announcement).toBe('*<Kenny> left the chat server*');
      done();
    }
  });
});

// Rule 5 - BEL character
test('send BEL character when the nickname is @mentioned', (done) => {
  clientOne.on('data', async (data) => {
    if (data.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      clientOne.write('Pinky');
    } else if (getAnnouncement(data, 0) === '*<Norman> has joined the chat*') {
      clientOne.write('Hi @Norman');
    }
  });

  clientTwo.on('data', async (dataTwo) => {
    if (dataTwo.toString() === '< Welcome to my chat server! What is your nickname?\n') {
      clientTwo.write('Norman');
    } else if (dataTwo.toString().includes('<Pinky> Hi @Norman')) {
      const message = getMessage(dataTwo, 0);
      expect(message).toBe('<Pinky> Hi @Norman');
      done();
    }
  });
});
