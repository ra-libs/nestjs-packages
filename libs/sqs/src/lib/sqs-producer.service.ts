import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { Producer } from 'sqs-producer';

import { SendMessage, SQSProducerOptionsService } from './types';

export class SQSProducerService {
  private producer: Producer;

  constructor(public readonly options: SQSProducerOptionsService) {
    const sqsOptionsConfig: SQSClientConfig = {};

    if (process.env['AWS_REGION']) {
      sqsOptionsConfig.region = process.env['AWS_REGION'];
    }

    if (process.env['SQS_AWS_ENDPOINT']) {
      sqsOptionsConfig.endpoint = process.env['SQS_AWS_ENDPOINT'];
    }

    if (
      process.env['AWS_ACCESS_KEY_ID'] &&
      process.env['AWS_SECRET_ACCESS_KEY']
    ) {
      sqsOptionsConfig.credentials = {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      };
    }

    const { sqsClientConfig, ...producerOptions } = this.options;

    const sqsClient = new SQSClient({
      ...sqsClientConfig,
      ...sqsOptionsConfig,
    });

    this.producer = Producer.create({
      ...producerOptions,
      sqs: sqsClient,
    });
  }

  public getProducerQueueSize() {
    return this.producer?.queueSize();
  }

  public async send<T = unknown>(payload: SendMessage<T> | SendMessage<T>[]) {
    const originalMessages = Array.isArray(payload) ? payload : [payload];
    const messages = originalMessages.map((message) => {
      let body = message.body;
      if (typeof body !== 'string') {
        body = JSON.stringify(body) as any;
      }

      return {
        ...message,
        body,
      };
    });
    return this.producer?.send(messages as any[]);
  }
}
