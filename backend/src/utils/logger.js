const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp(),
    colorize({ all: true }),
    myFormat
  ),
  transports: [
    new transports.Console({ handleExceptions: true }),
  ],
  exitOnError: false,
});

module.exports = logger;
