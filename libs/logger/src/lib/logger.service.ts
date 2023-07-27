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
  public winstonLogger: WinstonLogger;

  protected context?: string;
  protected options?: LoggerOptions;

  constructor(context?: string, options?: LoggerOptions) {
    this.winstonLogger = createLogger({
      level: getLogLevel(),
      format: getFormat(),
      transports: [new transports.Console()],
      ...options,
    });
    this.context = context;
    this.options = options;
  }

  public setContext(context: string) {
    this.context = context;
  }

  public child(options: object) {
    const childLogger = new Logger(this.context, this.options);
    childLogger.winstonLogger = this.winstonLogger.child(options);
    return childLogger;
  }

  log(message: unknown, fields?: Record<string, unknown>) {
    this.winstonLogger.info({
      message,
      context: this.context,
      fields,
    });
  }
  error(message: unknown, error?: Error, fields?: Record<string, unknown>) {
    this.winstonLogger.error({
      message,
      context: this.context,
      error,
      fields,
    });
  }
  warn(message: unknown, fields?: Record<string, unknown>) {
    this.winstonLogger.warn({
      message,
      context: this.context,
      fields,
    });
  }

  debug(message: unknown, fields?: Record<string, unknown>) {
    this.winstonLogger.debug({
      message,
      context: this.context,
      fields,
    });
  }

  verbose(message: unknown, fields?: Record<string, unknown>) {
    this.winstonLogger.verbose({
      message,
      context: this.context,
      fields,
    });
  }
}
