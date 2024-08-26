export type LogLevel = 'info' | 'error';

export abstract class BaseLogger {
  private static instance: BaseLogger;

  protected logArray: string[] = [];

  constructor() {
    if (BaseLogger.instance) {
      return BaseLogger.instance;
    }
    BaseLogger.instance = this;
  }

  abstract log(message: string, level: LogLevel): void;
  abstract logApiRequest(requestInfo: string): void;
  abstract logApiResponse(responseInfo: string, level?: LogLevel): void;
  abstract sendLogsToReport(): void;
  protected clearLogs(): void {
    this.logArray = [];
  }
}
