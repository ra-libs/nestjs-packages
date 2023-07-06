import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import * as crypto from 'crypto';

export const RequestId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const requestIdHeaderKey =
      process.env['REQUEST_ID_HEADER_KEY'] ?? 'x-request-id';
    const incomingRequestId = request.headers[requestIdHeaderKey];
    return incomingRequestId ?? crypto.randomUUID(); // generate a new uuid v4 if not present
  }
);
