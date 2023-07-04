import { RequestId } from '../request-id.decorator';

import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

import { getParamDecoratorFactory } from '../../factories/get-param-decorator.factory';

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
    const mockRequest = {
      headers: {
        'x-request-id': 'existing-id',
      },
    };
    getRequestMock.mockReturnValue(mockRequest);
    const result = requestIdDecorator(null, executionContextMock);
    expect(result).toBe('existing-id');
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
