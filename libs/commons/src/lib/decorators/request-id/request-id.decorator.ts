import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import * as crypto from 'crypto';

export const RequestId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const requestIdHeaderKey =
      process.env['REQUEST_ID_HEADER_KEY'] ?? 'x-request-id';
    const incomingRequestId = request.headers[requestIdHeaderKey];
    console.log('requestIdHeaderKey: ', requestIdHeaderKey);
    console.log(`Incoming request id ${incomingRequestId}`);
    if (!incomingRequestId) {
      // Temp debug
      console.log(`No request id found in header ${requestIdHeaderKey}`);
      console.log(`Generating new request id`);
      const newRequestId = crypto.randomUUID();
      console.log(`Generated new request id ${newRequestId}`);
      return newRequestId;
    }

    return incomingRequestId;
  }
);
