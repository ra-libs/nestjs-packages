import { MessageAttributeValue } from '@aws-sdk/client-sns';
import { SQSClientConfig } from '@aws-sdk/client-sqs';
import { ProducerOptions } from 'sqs-producer';

export type QueueName = string;

export type SQSOptions = {
  producers?: SQSProducerOptions[];
  sqsClientConfig?: SQSClientConfig;
};

export type SQSProducerOptions = ProducerOptions & {
  name: QueueName;
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
