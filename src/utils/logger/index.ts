import { BaseLogger } from './baseLogger';
import WinstonLogger from './winston.logger';

const loggerService: Record<string, BaseLogger> = {
  winston: WinstonLogger,
};

export default loggerService[process.env.LOGGER || 'winston'];
