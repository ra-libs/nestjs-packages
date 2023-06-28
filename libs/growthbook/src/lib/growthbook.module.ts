import { Context } from '@growthbook/growthbook';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { GrowthbookService } from './growthbook.service';

@Global()
@Module({})
export class GrowthbookModule {
  static forRoot(context: Context = {}): DynamicModule {
    return {
      module: GrowthbookModule,
      providers: [
        {
          provide: GrowthbookService,
          useFactory: () => {
            return new GrowthbookService(context);
          },
        },
      ],
      exports: [GrowthbookService],
    };
  }
}
