import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { SNSService } from '../sns.service';

const snsClientMock = createMock<SNSClient>();

jest.mock('@aws-sdk/client-sns', () => {
  return {
    SNSClient: jest.fn().mockImplementation(() => snsClientMock),
    PublishCommand: jest
      .fn()
      .mockImplementation(() => createMock<PublishCommand>()),
  };
});

describe('SNSService', () => {
  let service: SNSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SNSService,
          useFactory: () => {
            return new SNSService({
              region: 'mocked-region',
            });
          },
        },
      ],
    }).compile();
    service = module.get<SNSService>(SNSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('publish', () => {
    it('should publish message', async () => {
      const topicArn = 'mocked-topic-arn';
      const message = 'mocked-message';

      await service.publish({
        TopicArn: topicArn,
        Message: message,
      });

      expect(snsClientMock.send).toBeCalledTimes(1);
      expect(snsClientMock.send).toBeCalledWith({
        TopicArn: topicArn,
        Message: message,
      });
    });
  });
});
