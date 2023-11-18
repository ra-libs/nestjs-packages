import { Global, Module } from '@nestjs/common';
import { UnleashConfig } from 'unleash-client';

import { UnleashService } from './unleash.service';

@Global()
@Module({})
export class UnleashModule {
  static forRoot(config?: UnleashConfig) {
    return {
      module: UnleashModule,
      providers: [
        {
          provide: UnleashService,
          useValue: new UnleashService(config),
        },
      ],
      exports: [UnleashService],
    };
  }
}
