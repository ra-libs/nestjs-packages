import { SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { SecretsManagerService } from '../secrets-manager.service';

const secretsManagerClientMock = createMock<SecretsManagerClient>();

jest.mock('@aws-sdk/client-secrets-manager', () => {
  return {
    SecretsManagerClient: jest
      .fn()
      .mockImplementation(() => secretsManagerClientMock),
  };
});

describe('SecretsManagerService', () => {
  let service: SecretsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SecretsManagerService,
          useFactory: () => {
            return new SecretsManagerService({
              region: 'mocked-region',
            });
          },
        },
      ],
    }).compile();

    service = module.get<SecretsManagerService>(SecretsManagerService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
