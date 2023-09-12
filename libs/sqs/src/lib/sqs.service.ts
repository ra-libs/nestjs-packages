import {
  GetQueueAttributesCommand,
  PurgeQueueCommand,
  QueueAttributeName,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Logger } from '@will-bank/logger';
import { Consumer } from 'sqs-consumer';
import { Producer } from 'sqs-producer';

import {
  SQS_CONSUMER_EVENT_HANDLER,
  SQS_CONSUMER_METHOD,
  SQS_OPTIONS,
} from './sqs.constants';
import {
  Message,
  QueueName,
  SqsConsumerEventHandlerMeta,
  SqsMessageHandlerMeta,
  SQSOptions,
} from './types';

@Injectable()
export class SQSService implements OnModuleInit, OnModuleDestroy {
  public readonly consumers = new Map<QueueName, Consumer>();
  public readonly producers = new Map<QueueName, Producer>();

  private sqsOptionsConfig: SQSClientConfig = {};
  private readonly logger = new Logger(SQSService.name);

  constructor(
    @Inject(SQS_OPTIONS) public readonly options: SQSOptions,
    private readonly discover: DiscoveryService
  ) {
    if (process.env['AWS_REGION']) {
      this.sqsOptionsConfig.region = process.env['AWS_REGION'];
    }

    if (process.env['SQS_AWS_ENDPOINT']) {
      this.sqsOptionsConfig.endpoint = process.env['SQS_AWS_ENDPOINT'];
    }
  }

  async onModuleInit() {
    const sqsClient = new SQSClient({
      ...this.options.sqsClientConfig,
      ...this.sqsOptionsConfig,
    });

    const messageHandlers =
      await this.discover.providerMethodsWithMetaAtKey<SqsMessageHandlerMeta>(
        SQS_CONSUMER_METHOD
      );
    const eventHandlers =
      await this.discover.providerMethodsWithMetaAtKey<SqsConsumerEventHandlerMeta>(
        SQS_CONSUMER_EVENT_HANDLER
      );

    // Create a consumer for each queue
    this.options.consumers?.forEach((options) => {
      const { queueName, ...consumerOptions } = options;
      if (this.consumers.has(queueName)) {
        throw new Error(`Consumer already exists: ${queueName}`);
      }

      const metadata = messageHandlers.find(
        ({ meta }) => meta.queueName === queueName
      );
      if (!metadata) {
        this.logger.warn(`No metadata found for: ${queueName}`);
        return;
      }

      const isBatchHandler = metadata.meta.batch === true;
      const consumer = Consumer.create({
        ...consumerOptions,
        sqs: sqsClient,
        ...(isBatchHandler
          ? {
              handleMessageBatch: metadata.discoveredMethod.handler.bind(
                metadata.discoveredMethod.parentClass.instance
              ),
            }
          : {
              handleMessage: metadata.discoveredMethod.handler.bind(
                metadata.discoveredMethod.parentClass.instance
              ),
            }),
      });

      const eventsMetadata = eventHandlers.filter(
        ({ meta }) => meta.queueName === queueName
      );
      for (const eventMetadata of eventsMetadata) {
        if (eventMetadata) {
          consumer.addListener(
            eventMetadata.meta.eventName,
            eventMetadata.discoveredMethod.handler.bind(
              metadata.discoveredMethod.parentClass.instance
            )
          );
        }
      }
      this.consumers.set(queueName, consumer);
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

    for (const consumer of this.consumers.values()) {
      consumer.start();
    }
  }

  public onModuleDestroy() {
    for (const consumer of this.consumers.values()) {
      consumer.stop();
    }
  }

  private getQueueInfo(queueName: QueueName) {
    if (!this.consumers.has(queueName) && !this.producers.has(queueName)) {
      throw new Error(`Consumer/Producer does not exist: ${queueName}`);
    }

    const { sqs, queueUrl } = (this.consumers.get(queueName) ??
      this.producers.get(queueName)) as {
      sqs: SQSClient;
      queueUrl: string;
    };
    if (!sqs) {
      throw new Error('SQS instance does not exist');
    }

    return {
      sqs,
      queueUrl,
    };
  }

  public async purgeQueue(queueName: QueueName) {
    const { sqs, queueUrl } = this.getQueueInfo(queueName);
    const command = new PurgeQueueCommand({
      QueueUrl: queueUrl,
    });
    return await sqs.send(command);
  }

  public async getQueueAttributes(queueName: QueueName) {
    const { sqs, queueUrl } = this.getQueueInfo(queueName);
    const command = new GetQueueAttributesCommand({
      QueueUrl: queueUrl,
      AttributeNames: ['All'],
    });
    const response = await sqs.send(command);
    return response.Attributes as { [key in QueueAttributeName]: string };
  }

  public getProducerQueueSize(name: QueueName) {
    if (!this.producers.has(name)) {
      throw new Error(`Producer does not exist: ${name}`);
    }
    const producer = this.producers.get(name);
    return producer?.queueSize();
  }

  public async send<T = unknown>(
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
