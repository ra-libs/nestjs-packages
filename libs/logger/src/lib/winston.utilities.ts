import safeStringify from 'fast-safe-stringify';
import { Format, TransformableInfo } from 'logform';
import { inspect } from 'util';
import { format } from 'winston';

import { LogLevel } from './@types';

export const getFormat = (): Format => {
  if (process.env['NODE_ENV'] === 'development') {
    return format.combine(
      format.errors({ stack: true }),
      format.timestamp(),
      format.ms(),
      nestLikeConsoleFormat()
    );
  }

  return format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.printf(buildPrint),
    format.json()
  );
};

function buildPrint(info: TransformableInfo): string {
  return (info.message = `${buildPrintContext(info)}${
    info.message
  }${buildPrintError(info)}`);
}

function buildPrintContext(info: TransformableInfo): string {
  const context = info['context'] || info['metadata']?.context;

  if (context) {
    return `[${context}] `;
  }

  return ``;
}

function buildPrintError(info: TransformableInfo): string {
  const error = info['error'] || info['metadata']?.error;

  if (error?.stack) {
    return ` [${error.stack}]`;
  }

  if (error?.message) {
    return ` [${error.message}]`;
  }

  return '';
}

export const getLogLevel = (): string => {
  const defaultLogLevel =
    process.env['NODE_ENV'] === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
  return process.env['LOG_LEVEL'] || defaultLogLevel;
};

// For Local Development
const clc = {
  bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
  green: (text: string) => `\x1B[32m${text}\x1B[39m`,
  yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
  red: (text: string) => `\x1B[31m${text}\x1B[39m`,
  magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
  cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

const nestLikeColorScheme: Record<string, (text: string) => string> = {
  info: clc.green,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

const nestLikeConsoleFormat = (appName = 'NestWinston'): Format =>
  format.printf(
    ({
      level,
      message,
      context,
      timestamp,
      fields,
      ms,
      ...meta
    }: TransformableInfo) => {
      if ('undefined' !== typeof timestamp) {
        // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
        // that is not a valid date string will throw, just ignore it (it will be printed as-is).
        try {
          if (timestamp === new Date(timestamp).toISOString()) {
            timestamp = new Date(timestamp).toLocaleString();
          }
        } catch (error) {
          // eslint-disable-next-line no-empty
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const color =
        nestLikeColorScheme[level] || ((text: string): string => text);
      const yellow = clc.yellow;

      delete meta['dd'];
      const stringifiedMeta = safeStringify(meta);
      const formattedMeta = inspect(JSON.parse(stringifiedMeta), {
        colors: true,
        depth: null,
      });

      if (fields && typeof fields === 'string' && !context) {
        context = fields;
      }

      return (
        `${color(`[${appName}] - `)} ` +
        ('undefined' !== typeof timestamp ? `${timestamp} ` : '') +
        `${color(level.toUpperCase())}\t` +
        ('undefined' !== typeof context
          ? `${yellow('[' + context + ']')} `
          : '') +
        `${color(message)}` +
        `${formattedMeta !== '{}' ? ` - ${formattedMeta}` : ''}` +
        ('undefined' !== typeof ms ? ` ${yellow(ms)}` : '')
      );
    }
  );
