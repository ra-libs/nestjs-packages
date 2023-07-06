import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { v4 as uuidv4, version as uuidVersion } from 'uuid';

export const RequestId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const requestIdHeaderKey =
      process.env['REQUEST_ID_HEADER_KEY'] ?? 'x-request-id';
    const incomingRequestId = request.headers[requestIdHeaderKey];
    if (!incomingRequestId || uuidVersion(incomingRequestId) !== 4) {
      return uuidv4();
    }
    return incomingRequestId;
  }
);
