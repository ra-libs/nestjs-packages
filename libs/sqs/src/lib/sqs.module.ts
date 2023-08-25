import { DynamicModule, Module } from '@nestjs/common';

import { SQSService } from './sqs.service';
import { SQSOptions } from './types';

@Module({})
export class SQSModule {
  static forRoot(options: SQSOptions): DynamicModule {
    return {
      global: true,
      module: SQSModule,
      providers: [
        {
          provide: SQSService,
          useValue: new SQSService(options),
        },
      ],
      exports: [SQSService],
    };
  }
}
