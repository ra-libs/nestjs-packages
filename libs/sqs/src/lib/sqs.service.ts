import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { Producer } from 'sqs-producer';

import { Message, QueueName, SQSOptions } from './types';

@Injectable()
export class SQSService {
  public readonly producers = new Map<QueueName, Producer>();

  constructor(private options: SQSOptions) {
    const sqsOptionsConfig: SQSClientConfig = {};

    if (process.env['AWS_REGION']) {
      sqsOptionsConfig.region = process.env['AWS_REGION'];
    }

    if (process.env['SQS_AWS_ENDPOINT']) {
      sqsOptionsConfig.endpoint = process.env['SQS_AWS_ENDPOINT'];
    }

    const sqsClient = new SQSClient({
      ...options.sqsClientConfig,
      ...sqsOptionsConfig,
    });

    // Create a producer for each queue
    this.options.producers?.forEach((producerOptions) => {
      if (this.producers.has(producerOptions.queueName)) {
        throw new Error(
          `A producer for queue ${producerOptions.queueName} already exists`
        );
      }

      const producer = Producer.create({ ...producerOptions, sqs: sqsClient });
      this.producers.set(producerOptions.queueName, producer);
    });
  }

  async send<T = unknown>(
    queueName: QueueName,
    payload: Message<T> | Message<T>[]
  ) {
    if (!this.producers.has(queueName)) {
      throw new Error(`No producer for queue ${queueName} exists`);
    }

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

    const producer = this.producers.get(queueName);
    return producer?.send(messages as any[]);
  }
}
