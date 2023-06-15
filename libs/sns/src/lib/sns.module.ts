import { SNSClientConfig } from '@aws-sdk/client-sns';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { SNSService } from './sns.service';

@Global()
@Module({})
export class SNSModule {
  static forRoot(options: SNSClientConfig = {}): DynamicModule {
    return {
      module: SNSModule,
      providers: [
        {
          provide: SNSService,
          useFactory: () => {
            return new SNSService({
              region: options.region ?? process.env['AWS_REGION'],
              ...options,
            });
          },
        },
      ],
      exports: [SNSService],
    };
  }
}
