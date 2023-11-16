import {
  Global,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import * as morgan from 'morgan';

import { NestjsLoggerServiceAdapter } from './adapters';
import { ContextModule } from './context';
import { Logger, LoggerBaseKey, LoggerKey } from './interfaces';
import { LoggerService } from './logger.service';
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
  constructor(@Inject(LoggerKey) private logger: Logger) {}

  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan(':method :url :status - :response-time ms :user-agent', {
          stream: {
            write: (message: string) => {
              this.logger.info(message, {
                sourceClass: 'RequestLogger',
              });
            },
          },
        })
      )
      .exclude('/health', '/health/*')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
