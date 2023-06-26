import { DynamicModule, Module } from '@nestjs/common';
import * as winston from 'winston';

import { Logger } from './logger.service';

@Module({})
export class LoggerModule {
  static forFeature(
    context?: string,
    options?: winston.LoggerOptions
  ): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: Logger,
          useValue: new Logger(context, options),
        },
      ],
      exports: [Logger],
    };
  }
}
