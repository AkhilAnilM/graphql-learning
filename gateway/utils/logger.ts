import winston from 'winston';

const config = {
  level: 'info',
  handleExceptions: true,
  format: winston.format.combine(winston.format.colorize()),
};

export const logger = winston.createLogger({
  transports: [new winston.transports.Console(config)],
  exitOnError: false,
});
