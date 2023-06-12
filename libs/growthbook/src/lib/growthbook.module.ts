import { Context, GrowthBook } from '@growthbook/growthbook';
import { DynamicModule, Module } from '@nestjs/common';

import { GROWTHTBOOK_CLIENT } from './growthbook.constants';
import { GrowthbookService } from './growthbook.service';

@Module({})
export class GrowthbookModule {
  static register(context: Context): DynamicModule {
    return {
      module: GrowthbookModule,
      providers: [
        {
          provide: GROWTHTBOOK_CLIENT,
          useFactory: () =>
            new GrowthBook({
              apiHost: context.apiHost || process.env['GROWTHBOOK_API_HOST'],
              clientKey:
                context.clientKey || process.env['GROWTHBOOK_CLIENT_KEY'],
              enableDevMode:
                context.enableDevMode ||
                process.env['NODE_END'] === 'development',
              ...context,
            }),
          inject: ['client'],
        },
        GrowthbookService,
      ],
      exports: [],
    };
  }
}
