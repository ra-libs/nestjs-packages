import * as winston from 'winston';

import { LogData, Logger } from './interfaces';
import { LogLevel } from './types';
import { getLoggerFormatOptions } from './winston.utilities';

export class WinstonLogger implements Logger {
  private logger: winston.Logger;
  private sourceClass: string;

  constructor(sourceClass?: string, options?: winston.LoggerOptions) {
    this.sourceClass = sourceClass || WinstonLogger.name;
    // Create winston logger
    this.logger = winston.createLogger(getLoggerFormatOptions(options));
  }

  public log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string
  ) {
    const logData = {
      level: level,
      message: message instanceof Error ? message.message : message,
      error: message instanceof Error ? message : undefined,
      ...data,
    };

    if (profile) {
      this.logger.profile(profile, logData);
    } else {
      this.logger.log(logData);
    }
  }

  public debug(message: string, data?: LogData, profile?: string) {
    this.log(LogLevel.Debug, message, data, profile);
  }

  public info(message: string, data?: LogData, profile?: string) {
    this.log(LogLevel.Info, message, data, profile);
  }

  public warn(message: string | Error, data?: LogData, profile?: string) {
    this.log(LogLevel.Warn, message, data, profile);
  }

  public error(message: string | Error, data?: LogData, profile?: string) {
    this.log(LogLevel.Error, message, data, profile);
  }

  public fatal(message: string | Error, data?: LogData, profile?: string) {
    this.log(LogLevel.Fatal, message, data, profile);
  }

  public emergency(message: string | Error, data?: LogData, profile?: string) {
    this.log(LogLevel.Emergency, message, data, profile);
  }

  public startProfile(id: string) {
    this.logger.profile(id);
  }

  private getLogData(data?: LogData): LogData {
    return {
      ...data,
      sourceClass: data?.sourceClass || this.sourceClass,
    };
  }
}
