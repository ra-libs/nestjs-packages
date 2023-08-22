import { S3ClientConfig } from '@aws-sdk/client-s3';
import { DynamicModule, Module } from '@nestjs/common';

import { S3Service } from './s3.service';

@Module({})
export class S3Module {
  static forFeature(
    bucket: string,
    options: S3ClientConfig = {}
  ): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3Service,
          useFactory: () => {
            return new S3Service(bucket, options);
          },
        },
      ],
      exports: [S3Service],
    };
  }
}
