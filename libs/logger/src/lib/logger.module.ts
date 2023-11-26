import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { NestjsLoggerServiceAdapter } from './adapters';
import { ContextModule } from './context';
import { Logger, LoggerBaseKey, LoggerKey } from './interfaces';
import { LoggerService } from './logger.service';
import { RequestLoggerMiddleware } from './middleware';
import { LoggerModuleOptions } from './types';
import { WinstonLogger } from './winston-logger.service';

@Module({})
export class LoggerModule implements NestModule {
  static forRoot(options: LoggerModuleOptions = {}): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      imports: [ContextModule],
      providers: [
        {
          provide: LoggerBaseKey,
          useValue: new WinstonLogger(undefined, options.winstonOptions),
        },
        {
          provide: LoggerKey,
          useClass: LoggerService,
        },
        {
          provide: NestjsLoggerServiceAdapter,
          useFactory: (logger: Logger) =>
            new NestjsLoggerServiceAdapter(logger),
          inject: [LoggerKey],
        },
      ],
      exports: [LoggerKey, NestjsLoggerServiceAdapter],
    };
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .exclude('/health', '/health/*')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
