import * as winston from 'winston';
import { BaseLogger, LogLevel } from './baseLogger';
import AllureReporter from '../reporter/reporters/allure';

class WinstonLogger extends BaseLogger {
  private logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
    ),
    transports: [new winston.transports.Console()],
  });

  log(message: string, level: LogLevel = 'info') {
    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message}`;
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
