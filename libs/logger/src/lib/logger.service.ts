import { Injectable, LoggerService, Scope } from '@nestjs/common';
import {
  createLogger,
  Logger as WinstonLogger,
  LoggerOptions,
  transports,
} from 'winston';

import { getFormat, getLogLevel } from './winston.utilities';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
  private logger: WinstonLogger;

  private context?: string;

  constructor(context?: string, options?: LoggerOptions) {
    this.logger = createLogger({
      level: getLogLevel(),
      format: getFormat(),
      transports: [new transports.Console()],
      ...options,
    });
    this.context = context;
  }

  public setContext(context: string) {
    this.context = context;
  }

  log(message: unknown, fields?: Record<string, unknown>) {
    this.logger.info({
      message,
      context: this.context,
      fields,
    });
  }
  error(message: unknown, error?: Error, fields?: Record<string, unknown>) {
    this.logger.error({
      message,
      context: this.context,
      error,
      fields,
    });
  }
  warn(message: unknown, fields?: Record<string, unknown>) {
    this.logger.warn({
      message,
      context: this.context,
      fields,
    });
  }

  debug(message: unknown, fields?: Record<string, unknown>) {
    this.logger.debug({
      message,
      context: this.context,
      fields,
    });
  }
}
