import { Injectable, NestMiddleware } from '@nestjs/common';
import { WinstonLogger } from '@will-bank/logger';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { CustomerModel } from './@types';

@Injectable()
export class XDataHashMiddleware implements NestMiddleware {
  private readonly logger = new WinstonLogger();

  use(req: Request, res: Response, next: NextFunction): any {
    try {
      const stringHeaderValue = req.headers['x-data-hash'] as string;

      if (!stringHeaderValue) {
        return res.status(400).send({
          statusCode: 400,
          message: 'Invalid provided token. X-data-hash is undefined.',
        });
      }

      const userDataString = Buffer.from(
        stringHeaderValue,
        'base64'
      ).toString();
      const userDataJson: CustomerModel = JSON.parse(userDataString);

      const traceId = req.headers['x-trace-id'] || uuidv4();
      const accountWithDigit = `${userDataJson.accessPrivate.cfi.account}${userDataJson.accessPrivate.cfi.digit}`;

      req.headers['x-b3-traceid'] = traceId;
      req.headers['x-account-id'] = accountWithDigit;
      req.headers['x-customer-id'] = userDataJson.accessPublic.sub;
      req.headers['x-document-id'] = userDataJson.accessPrivate.username;

      if (req.body) {
        req.body.userDataJson = userDataJson;
      }

      return next();
    } catch (error: any) {
      this.logger.error(`FillUserDataMiddleware - Invalid provided JSON`, {
        error,
      });

      return res
        .status(400)
        .send({ statusCode: 400, message: 'Token JWT Inválido' });
    }
  }
}
