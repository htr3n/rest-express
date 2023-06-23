import 'dotenv/config';
import winston from 'winston';

/**
 *  See:
 *  - <https://github.com/winstonjs/winston>
 * - <https://www.kimsereylam.com/typescript/2021/12/03/winston-logger-with-typescript.html>
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      )
    })
  );
}

export default logger;
