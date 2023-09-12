import { SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';

import { SQSConsumerOptionsService } from './types';

export class SQSConsumerService {
  private consumer: Consumer;

  constructor(public readonly options: SQSConsumerOptionsService) {
    const sqsOptionsConfig: SQSClientConfig = {};

    if (process.env['AWS_REGION']) {
      sqsOptionsConfig.region = process.env['AWS_REGION'];
    }

    if (process.env['SQS_AWS_ENDPOINT']) {
      sqsOptionsConfig.endpoint = process.env['SQS_AWS_ENDPOINT'];
    }

    const { sqsClientConfig, ...consumerOptions } = this.options;

    const sqsClient = new SQSClient({
      ...sqsClientConfig,
      ...sqsOptionsConfig,
    });

    this.consumer = Consumer.create({
      ...consumerOptions,
      sqs: sqsClient,
    });
  }

  public async start() {
    return this.consumer?.start();
  }

  public async stop() {
    return this.consumer?.stop();
  }
}
