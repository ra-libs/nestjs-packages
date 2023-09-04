import { AthenaClientConfig } from '@aws-sdk/client-athena';
import { DynamicModule, Module } from '@nestjs/common';

import { AthenaService } from './athena.service';

@Module({})
export class AthenaModule {
  static forFeature(options: AthenaClientConfig = {}): DynamicModule {
    return {
      module: AthenaModule,
      providers: [
        {
          provide: AthenaService,
          useFactory: () => {
            return new AthenaService(options);
          },
        },
      ],
      exports: [AthenaService],
    };
  }
}
