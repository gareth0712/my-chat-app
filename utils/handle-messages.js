const addMessages = (message, historicalMessages) => {
  while (historicalMessages.length >= 10) {
    historicalMessages.shift();
  }
  historicalMessages.push(message);
};

const showHistoricalMessages = (socket, historicalMessages) => {
  if (historicalMessages.length === 0) {
    return;
  }
  socket.write(`Retrieving lastest ${historicalMessages.length} messages in the chat server ...\n`);
  historicalMessages.forEach((message) => {
    socket.write(message);
  });
};

module.exports = {
  addMessages,
  showHistoricalMessages,
};
