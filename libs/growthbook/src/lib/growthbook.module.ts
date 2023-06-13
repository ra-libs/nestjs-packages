import { Context } from '@growthbook/growthbook';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { GrowthbookService } from './growthbook.service';

@Global()
@Module({})
export class GrowthbookModule {
  static register(context: Context = {}): DynamicModule {
    return {
      module: GrowthbookModule,
      providers: [
        {
          provide: GrowthbookService,
          useFactory: () => {
            return new GrowthbookService({
              apiHost: context.apiHost || process.env['GROWTHBOOK_API_HOST'],
              clientKey:
                context.clientKey || process.env['GROWTHBOOK_CLIENT_KEY'],
              enableDevMode:
                context.enableDevMode ||
                process.env['NODE_END'] === 'development',
              ...context,
            });
          },
        },
      ],
      exports: [GrowthbookService],
    };
  }
}
