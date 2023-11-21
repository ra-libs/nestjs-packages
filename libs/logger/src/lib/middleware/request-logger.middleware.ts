import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { LogData, Logger, LoggerKey } from '../interfaces';
import { LogLevel } from '../types';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const start = process.hrtime();

    response.on('finish', () => {
      const { statusCode } = response;
      const durationInMilliseconds = this.getDurationInMilliseconds(start);

      const logLevel =
        statusCode >= 500
          ? LogLevel.Error
          : statusCode >= 400
          ? LogLevel.Warn
          : LogLevel.Info;

      const logData: LogData = {
        props: {
          originalUrl,
          statusCode,
          userAgent,
        },
      };

      this.logger.log(
        logLevel,
        `${method} ${originalUrl} ${statusCode} - ${durationInMilliseconds} ms - ${userAgent} ${ip}`,
        logData
      );
    });

    next();
  }

  private getDurationInMilliseconds(start: [number, number]) {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  }
}
