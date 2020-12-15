const moment = require('moment');

const messageWithTime = () => {
  return `< [${moment().format('hh:mm:ss')}]`;
};

module.exports = {
  messageWithTime,
};
