import { DynamicModule, Global } from '@nestjs/common';
import { ClientOptions } from 'hot-shots';

import { MetricsService } from './metrics.service';

@Global()
export class MetricsModule {
  static forRoot(options: ClientOptions = {}): DynamicModule {
    return {
      module: MetricsModule,
      providers: [
        {
          provide: MetricsService,
          useFactory: () => {
            return new MetricsService(options);
          },
        },
      ],
      exports: [MetricsService],
    };
  }
}
