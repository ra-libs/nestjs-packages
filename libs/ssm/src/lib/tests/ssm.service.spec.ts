import {
  GetParameterCommand,
  GetParametersByPathCommand,
  SSMClient,
} from '@aws-sdk/client-ssm';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { SSMService } from '../ssm.service';

const ssmClientMock = createMock<SSMClient>();

jest.mock('@aws-sdk/client-ssm', () => {
  return {
    SSMClient: jest.fn().mockImplementation(() => ssmClientMock),
    GetParameterCommand: jest
      .fn()
      .mockImplementation(() => createMock<GetParameterCommand>()),
    GetParametersByPathCommand: jest
      .fn()
      .mockImplementation(() => createMock<GetParametersByPathCommand>()),
  };
});

describe('SSMService', () => {
  let service: SSMService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SSMService,
          useFactory: () => {
            return new SSMService({
              region: 'mocked-region',
            });
          },
        },
      ],
    }).compile();

    service = module.get<SSMService>(SSMService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getParameter', () => {
    it('should call the SSMClient with the correct parameters', async () => {
      await service.getParameter({
        Name: 'mocked-parameter-name',
      });

      expect(ssmClientMock.send).toBeCalledTimes(1);
      expect(ssmClientMock.send).toBeCalledWith({
        Name: 'mocked-parameter-name',
      });
    });
  });

  describe('getParametersByPath', () => {
    it('should call the SSMClient with the correct parameters', async () => {
      await service.getParametersByPath({
        Path: 'mocked-parameter-path',
      });

      expect(ssmClientMock.send).toBeCalledTimes(1);
      expect(ssmClientMock.send).toBeCalledWith({
        Path: 'mocked-parameter-path',
      });
    });
  });
});
