import { LogLevel } from '../types';
import { LogData } from './log-data.interface';

export const LoggerBaseKey = Symbol();
export const LoggerKey = Symbol();

export interface Logger {
  log(
    level: LogLevel,
    message: string | Error,
    data?: LogData,
    profile?: string
  ): void;
  debug(message: string, data?: LogData, profile?: string): void;
  info(message: string, data?: LogData, profile?: string): void;
  warn(message: string | Error, data?: LogData, profile?: string): void;
  error(message: string | Error, data?: LogData, profile?: string): void;
  fatal(message: string | Error, data?: LogData, profile?: string): void;
  emergency(message: string | Error, data?: LogData, profile?: string): void;
  startProfile(id: string): void;
}
