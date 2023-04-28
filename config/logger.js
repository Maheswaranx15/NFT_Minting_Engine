const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    enumerateErrorFormat(), 
    winston.format.splat(),
    winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    winston.format.printf(({ level, timestamp, message }) => `${level} ${timestamp} ${message}`)
  ),
  transports: [
    new winston.transports.File({
      filename: 'log/production.log',
      maxsize: 5242880
    })
  ],
});

module.exports = logger;
