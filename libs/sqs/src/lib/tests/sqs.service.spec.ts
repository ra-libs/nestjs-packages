import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Producer } from 'sqs-producer';

import { SQS_OPTIONS } from '../sqs.constants';
import { SQSService } from '../sqs.service';
import { SQSOptions } from '../types';

const producerCreateMock = createMock<Producer>();

jest.mock('sqs-producer', () => {
  return {
    Producer: {
      create: jest.fn().mockImplementation(() => producerCreateMock),
    },
  };
});

describe('SQSService', () => {
  let service: SQSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DiscoveryModule],
      providers: [
        {
          provide: SQS_OPTIONS,
          useValue: {
            producers: [
              {
                queueName: 'test',
                queueUrl: 'http://localhost:4566/000000000000/test',
              },
            ],
          } as SQSOptions,
        },
        SQSService,
      ],
    }).compile();

    service = module.get<SQSService>(SQSService);
    await service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send', () => {
    it('should send a message to the queue', async () => {
      await service.send('test', {
        body: 'test',
        id: 'test',
      });

      expect(producerCreateMock.send).toHaveBeenCalledWith([
        {
          body: 'test',
          id: 'test',
        },
      ]);
    });
  });
});
