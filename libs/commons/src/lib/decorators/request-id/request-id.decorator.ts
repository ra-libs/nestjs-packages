import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const RequestId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const requestIdHeaderKey =
      process.env['REQUEST_ID_HEADER_KEY'] ?? 'x-request-id';
    const incomingRequestId = request.headers[requestIdHeaderKey];
    if (!incomingRequestId) {
      return uuidv4();
    }
    return incomingRequestId;
  }
);
