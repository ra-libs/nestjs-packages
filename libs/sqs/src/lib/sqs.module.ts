import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { DynamicModule, Module, Provider } from '@nestjs/common';

import { SQS_OPTIONS } from './sqs.constants';
import { SQSService } from './sqs.service';
import { SQSOptions } from './types';

@Module({})
export class SQSModule {
  static forRoot(options: SQSOptions): DynamicModule {
    const sqsOptions: Provider = {
      provide: SQS_OPTIONS,
      useValue: options,
    };

    const sqsProvider: Provider = {
      provide: SQSService,
      useFactory: (options: SQSOptions, discoveryService: DiscoveryService) =>
        new SQSService(options, discoveryService),
      inject: [SQS_OPTIONS, DiscoveryService],
    };

    return {
      global: true,
      module: SQSModule,
      imports: [DiscoveryModule],
      providers: [sqsOptions, sqsProvider],
      exports: [sqsProvider],
    };
  }
}
