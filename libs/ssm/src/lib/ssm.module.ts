import { SSMClientConfig } from '@aws-sdk/client-ssm';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { SSMService } from './ssm.service';

@Global()
@Module({})
export class SSMModule {
  static forRoot(options: SSMClientConfig = {}): DynamicModule {
    return {
      module: SSMModule,
      providers: [
        {
          provide: SSMService,
          useFactory: () => {
            return new SSMService(options);
          },
        },
      ],
      exports: [SSMService],
    };
  }
}
