import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@will-bank/logger';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLoggerMiddleware');
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const start = process.hrtime();

    response.on('finish', () => {
      const { statusCode } = response;
      const durationInMilliseconds = this.getDurationInMilliseconds(start);
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${durationInMilliseconds}ms - ${userAgent} ${ip}`,
        {
          originalUrl,
          statusCode,
          userAgent,
        }
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
