import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AccountOwnerData } from './@types';

const X_DATA_HASH_HEADER = 'x-data-hash';

export const AccountOwner = createParamDecorator(
  (_: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const xDataHash = request.headers[X_DATA_HASH_HEADER];
    const decodedXDataHash = JSON.parse(
      Buffer.from(xDataHash, 'base64').toString('utf-8')
    );

    return {
      customerId: decodedXDataHash.accessPublic.sub,
      account: `${decodedXDataHash.accessPrivate.cfi.account}${decodedXDataHash.accessPrivate.cfi.digit}`,
      name: decodedXDataHash.accessPublic.name,
      documentNumber: decodedXDataHash.accessPrivate.username,
      email: decodedXDataHash.accessPublic.email,
    } as AccountOwnerData;
  }
);
