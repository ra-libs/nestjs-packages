import { faker } from '@faker-js/faker';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { v1 as uuidV1 } from 'uuid';

import { getParamDecoratorFactory } from '../../factories/get-param-decorator.factory';
import { RequestId } from '../request-id.decorator';

/// Usage
describe('@RequestId', () => {
  const getRequestMock = jest.fn();
  const executionContextMock = createMock<ExecutionContext>({
    switchToHttp: () => ({
      getRequest: getRequestMock,
    }),
  });
  const requestIdDecorator = getParamDecoratorFactory(RequestId);

  it('test_existing_request_id', () => {
    const requestId = faker.string.uuid();
    const mockRequest = {
      headers: {
        'x-request-id': requestId,
      },
    };
    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBe(requestId);
  });

  it('test_existing_request_id_with_different_header_key', () => {
    const requestId = faker.string.uuid();
    const mockRequest = {
      headers: {
        'x-correlation-id': requestId,
      },
    };
    process.env['REQUEST_ID_HEADER_KEY'] = 'x-correlation-id';
    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBe(requestId);
  });

  it('test_new_request_id', () => {
    const mockRequest = {
      headers: {},
    };
    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('test_empty_request_id', () => {
    const mockRequest = {
      headers: {
        'x-request-id': '',
      },
    };
    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('test_null_request_id', () => {
    const mockRequest = {
      headers: {
        'x-request-id': null,
      },
    };

    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('test_undefined_request_id', () => {
    const mockRequest = {
      headers: {
        'x-request-id': undefined,
      },
    };
    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
