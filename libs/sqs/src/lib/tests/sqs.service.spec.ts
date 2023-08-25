import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Producer } from 'sqs-producer';

import { SQSService } from '../sqs.service';

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
      providers: [
        {
          provide: SQSService,
          useFactory: () => {
            return new SQSService({
              producers: [
                {
                  name: 'test',
                  queueUrl: 'https://test.com',
                },
              ],
            });
          },
        },
      ],
    }).compile();

    service = module.get<SQSService>(SQSService);
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
