import { format } from 'winston';
import { Format, TransformableInfo } from 'logform';
import { LogLevel } from './@types';

export const getFormat = (): Format => {
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
