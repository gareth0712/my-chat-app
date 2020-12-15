const log4js = require('log4js');
const moment = require('moment');

const logFilename = `my-chat-app-${moment().format('YYYYMMDD')}.log`;
const localLogFilePath = `${__dirname}/../log/${logFilename}`;
log4js.configure({
  appenders: {
    everything: { type: 'dateFile', filename: localLogFilePath },
  },
  categories: {
    default: { appenders: ['everything'], level: 'debug' },
  },
});

const logger = log4js.getLogger('my-chat-app');

module.exports = logger;
