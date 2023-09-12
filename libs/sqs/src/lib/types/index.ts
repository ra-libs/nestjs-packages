import {
  Message as SQSMessage,
  MessageAttributeValue,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { ConsumerOptions } from 'sqs-consumer';
import { ProducerOptions } from 'sqs-producer';

export type QueueName = string;

export type SQSOptions = {
  producers?: SQSProducerOptions[];
  consumers?: SQSConsumerOptions[];
  sqsClientConfig?: SQSClientConfig;
};

export type SQSConsumerOptions = Omit<
  ConsumerOptions,
  'handleMessage' | 'handleMessageBatch'
> & {
  queueName: QueueName;
};

export type SQSProducerOptions = ProducerOptions & {
  queueName: QueueName;
};

export interface Message<T = unknown> {
  id: string;
  body: T;
  groupId?: string;
  deduplicationId?: string;
  delaySeconds?: number;
  messageAttributes?: {
    [key: string]: MessageAttributeValue;
  };
}

export interface SqsMessageHandlerMeta {
  queueName: string;
  batch?: boolean;
}

export interface SqsConsumerEventHandlerMeta {
  queueName: string;
  eventName: string;
}

export type SQSProducerOptionsService = SQSProducerOptions & {
  sqsClientConfig?: SQSClientConfig;
};

export type SQSConsumerOptionsService = SQSConsumerOptions & {
  handleMessage: (message: SQSMessage) => Promise<void | SQSMessage>;
  sqsClientConfig?: SQSClientConfig;
};
