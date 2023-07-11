import { SecretsManagerClientConfig } from '@aws-sdk/client-secrets-manager';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { SecretsManagerService } from './secrets-manager.service';

@Global()
@Module({})
export class SecretsManagerModule {
  static forRoot(options: SecretsManagerClientConfig = {}): DynamicModule {
    return {
      module: SecretsManagerModule,
      providers: [
        {
          provide: SecretsManagerService,
          useFactory: () => {
            return new SecretsManagerService(options);
          },
        },
      ],
      exports: [SecretsManagerService],
    };
  }
}
