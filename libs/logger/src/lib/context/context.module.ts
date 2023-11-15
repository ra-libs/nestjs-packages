import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { v4 } from 'uuid';

import { ContextStorageServiceKey } from '../interfaces/context-storage-service.interface';
import { NestjsClsContextStorageService } from './nestjs-cls-context-storage.service';

@Global()
@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: any) => req.headers['x-correlation-id'] ?? v4(),
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: ContextStorageServiceKey,
      useClass: NestjsClsContextStorageService,
    },
  ],
  exports: [ContextStorageServiceKey],
})
export class ContextModule {}
