import { createMock } from '@golevelup/ts-jest';
import { Producer } from 'sqs-producer';

import { SQSProducerService } from '../sqs-producer.service';

const producerCreateMock = createMock<Producer>();

jest.mock('sqs-producer', () => {
  return {
    Producer: {
      create: jest.fn().mockImplementation(() => producerCreateMock),
    },
  };
});

describe('SQSProducerService', () => {
  let service: SQSProducerService;

  beforeEach(async () => {
    service = new SQSProducerService({
      queueName: 'test',
      queueUrl: 'http://localhost:4566/000000000000/test',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('send', () => {
    it('should send a message to the queue', async () => {
      await service.send({
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
