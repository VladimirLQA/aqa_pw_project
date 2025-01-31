import * as winston from 'winston';
import { BaseLogger, LogLevel } from './baseLogger';
import AllureReporter from '../reporter/reporters/allure';

const dateLogEntry = new Date().toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  minute: 'numeric',
  hour: 'numeric',
  second: 'numeric',
});

class WinstonLogger extends BaseLogger {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.json(),
      winston.format.printf(
        ({ timestamp, level, message, stack }) => `[${timestamp}] - [${level}]: ${stack || message}`,
      ),
    ),
    transports: [new winston.transports.Console({ format: winston.format.colorize({ all: true }) })],
  });

  log(message: string, level: LogLevel = 'info') {
    const logEntry = `${dateLogEntry} [${level.toUpperCase()}]: ${message}`;
    this.logArray.push(logEntry);
    this.logger.log({ level, message });
  }

  logApiRequest(requestInfo: string) {
    this.log(`API Request: ${requestInfo}`);
  }

  logApiResponse(responseInfo: string, level: LogLevel = 'info') {
    this.log(`API Response: ${responseInfo}`);
  }

  sendLogsToReport() {
    const log = this.logArray.join('\n');
    AllureReporter.attachLog(log);
    this.clearLogs();
  }
}

export default new WinstonLogger();
