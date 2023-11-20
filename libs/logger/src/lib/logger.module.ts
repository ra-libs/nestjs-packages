import {
  Global,
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
import { WinstonLogger } from './winston-logger.service';

@Global()
@Module({
  imports: [ContextModule],
  providers: [
    {
      provide: LoggerBaseKey,
      useClass: WinstonLogger,
    },
    {
      provide: LoggerKey,
      useClass: LoggerService,
    },
    {
      provide: NestjsLoggerServiceAdapter,
      useFactory: (logger: Logger) => new NestjsLoggerServiceAdapter(logger),
      inject: [LoggerKey],
    },
  ],
  exports: [LoggerKey, NestjsLoggerServiceAdapter],
})
export class LoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .exclude('/health', '/health/*')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
