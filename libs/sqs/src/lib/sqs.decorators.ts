import { SetMetadata } from '@nestjs/common';

import {
  SQS_CONSUMER_EVENT_HANDLER,
  SQS_CONSUMER_METHOD,
} from './sqs.constants';

export const SqsMessageHandler = (queueName: string, batch?: boolean) =>
  SetMetadata(SQS_CONSUMER_METHOD, { queueName, batch });
export const SqsConsumerEventHandler = (queueName: string, eventName: string) =>
  SetMetadata(SQS_CONSUMER_EVENT_HANDLER, { queueName, eventName });
