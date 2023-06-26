import { Test, TestingModule } from '@nestjs/testing';
import { Logger as WinstonLogger } from 'winston';
import { createMock } from '@golevelup/ts-jest';

import { Logger } from '../logger.service';

const loggerMock = createMock<WinstonLogger>();

jest.mock('winston', () => ({
  createLogger: jest.fn().mockImplementation(() => loggerMock),
  format: createMock(),
  transports: {
    Console: jest.fn(),
  },
}));

describe('Logger', () => {
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: Logger,
          useValue: new Logger(),
        },
      ],
    }).compile();

    logger = module.get<Logger>(Logger);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(Logger).toBeDefined();
  });

  describe('log', () => {
    it('should call logger.info', () => {
      const message = 'test message';
      const fields = { test: 'test' };

      logger.log(message, fields);

      const expectedParams = {
        message,
        context: undefined,
        fields,
      };

      expect(loggerMock.info).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('error', () => {
    it('should call logger.error', () => {
      const message = 'test message';
      const error = new Error('test error');
      const fields = { test: 'test' };

      logger.error(message, error, fields);

      const expectedParams = {
        message,
        context: undefined,
        error,
        fields,
      };

      expect(loggerMock.error).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('warn', () => {
    it('should call logger.warn', () => {
      const message = 'test message';
      const fields = { test: 'test' };

      logger.warn(message, fields);

      const expectedParams = {
        message,
        context: undefined,
        fields,
      };

      expect(loggerMock.warn).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe('debug', () => {
    it('should call logger.debug', () => {
      const message = 'test message';
      const fields = { test: 'test' };

      logger.debug(message, fields);

      const expectedParams = {
        message,
        context: undefined,
        fields,
      };

      expect(loggerMock.debug).toHaveBeenCalledWith(expectedParams);
    });
  });
});
