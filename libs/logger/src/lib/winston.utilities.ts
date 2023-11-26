import * as chalk from 'chalk';
import safeStringify from 'fast-safe-stringify';
import { Format, TransformableInfo } from 'logform';
import { inspect } from 'util';
import { format, LoggerOptions, transports } from 'winston';

import { LogLevel } from './types';

export function getLoggerFormatOptions(options?: LoggerOptions): LoggerOptions {
  // Setting log levels for winston
  const levels: any = {};
  let cont = 0;

  Object.values(LogLevel).forEach((level) => {
    levels[level] = cont;
    cont++;
  });

  const transportsOptions = [new transports.Console()];
  if (options?.transports) {
    transportsOptions.push(...(options?.transports as any));
  }

  return {
    level: getLogLevel(),
    levels: levels,
    format: getFormat(),

    ...options,
    transports: transportsOptions,
  };
}

export const getFormat = (): Format => {
  const formatError = format((info) => {
    // Info contains an Error property
    if (info['error'] && info['error'] instanceof Error) {
      info['stack'] = info['error'].stack;
    }
    return info;
  });

  if (process.env['NODE_ENV'] !== 'production') {
    return format.combine(
      format.errors({ stack: true }),
      formatError(),
      format.timestamp(),
      format.ms(),
      format.splat(),
      format.metadata({
        key: 'data',
        fillExcept: ['timestamp', 'level', 'message', 'ms', 'error', 'dd'],
      }),
      nestLikeConsoleFormat()
    );
  }

  return format.combine(
    format.errors({ stack: true }),
    formatError(),
    format.timestamp(),
    format.splat(),
    format.printf(buildPrint),
    format.json()
  );
};

function buildPrint(info: TransformableInfo): string {
  return (info.message = `${buildPrintSourceClass(info)}${
    info.message
  }${buildPrintError(info)}`);
}

function buildPrintSourceClass(info: TransformableInfo): string {
  const sourceClass = info['sourceClass'] || info['metadata']?.sourceClass;

  if (sourceClass) {
    return `[${sourceClass}] `;
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
    process.env['NODE_ENV'] === 'production' ? LogLevel.Info : LogLevel.Debug;
  return process.env['LOG_LEVEL'] || defaultLogLevel;
};

export const getAppName = (): string => {
  return process.env['APP_NAME'] || '';
};

// For Local Development
const clc = {
  bold: (text: string) => chalk.bold(text),
  green: (text: string) => chalk.green(text),
  yellow: (text: string) => chalk.yellow(text),
  red: (text: string) => chalk.red(text),
  redBright: (text: string) => chalk.redBright(text),
  boldRed: (text: string) => chalk.bold.red(text),
  magentaBright: (text: string) => chalk.magentaBright(text),
  cyanBright: (text: string) => chalk.cyanBright(text),
};

const nestLikeColorScheme: Record<string, (text: string) => string> = {
  info: clc.green,
  error: clc.redBright,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
  fatal: clc.red,
  emergency: clc.boldRed,
};

const nestLikeConsoleFormat = (): Format =>
  format.printf((info: TransformableInfo) => {
    const { level, message, data, ms, ...meta } = info;
    delete meta['error'];

    let { timestamp } = info;
    delete meta['timestamp'];

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

    const {
      sourceClass,
      props,
      correlationId,
      app = getAppName(),
    } = data || {};
    const metaToUse = { ...props, ...meta, correlationId };

    const stringifiedMeta = safeStringify(metaToUse);
    const formattedMeta = inspect(JSON.parse(stringifiedMeta), {
      colors: true,
      depth: null,
    });

    return (
      `${color(`[${app}] - `)} ` +
      ('undefined' !== typeof timestamp ? `${timestamp} ` : '') +
      `${color(level.toUpperCase())}\t` +
      ('undefined' !== typeof sourceClass
        ? `${yellow('[' + sourceClass + ']')} `
        : '') +
      `${color(`${message}${buildPrintError(info)}`)}` +
      `${formattedMeta !== '{}' ? ` - ${formattedMeta}` : ''}` +
      ('undefined' !== typeof ms ? ` ${yellow(ms)}` : '')
    );
  });
