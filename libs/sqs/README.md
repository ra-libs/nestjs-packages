# sqs

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @will-bank/sqs
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage - Consumer

### Nestjs

in your `app.module.ts` import this module

```ts
import { SQSModule } from '@will-bank/sqs';

@Module({
  imports: [
    // ...
    SQSModule.forRoot({
      consumers: [
        {
          queueName: 'test',
          queueUrl: 'http://localhost:4566/000000000000/test',
        },
      ],
    }),
  ],
})
export class AppModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION

In your specific service:

## Decorate Methods

```ts
import { Message, SqsMessageHandler, SqsConsumerEventHandler } from '@will-bank/sqs';

@Injectable()
export class AppMessageHandler {
  @SqsMessageHandler(/** name: */ 'queueName', /** batch: */ false)
  public async handleMessage(message: Message) {}

  @SqsConsumerEventHandler(/** name: */ 'queueName', /** eventName: */ 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    // report errors here
  }
}
```

## Usage - Producer

### Nestjs

in your `app.module.ts` import this module

```ts
import { SQSModule } from '@will-bank/sqs';

@Module({
  imports: [
    // ...
    SQSModule.forRoot({
      producers: [
        {
          queueName: 'test',
          queueUrl: 'http://localhost:4566/000000000000/test',
        },
      ],
    }),
  ],
})
export class AppModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION

In your specific service inject the SQSService as follow:

```ts
import { SQSService } from '@will-bank/sqs';

@Injectable()
export class YourService {
  constructor(private readonly sqsService: SQSService, private readonly configService: ConfigService) {}

  async xptoMethod() {
    // Do Something
    await this.sqsService.send('queue-name', {
      id: 'test',
      body: 'test',
    });
  }
}
```

> Check the PublishCommandInput exported from `@aws-sdk/client-sns` for more input options.

### Node

```ts
import { SQSProducerService } from '@will-bank/sqs';

const sqsProducerService = new SQSProducerService({
  producers: [
    {
      queueName: 'test',
      queueUrl: 'https://test.com',
    },
  ],
});

await sqsProducerService.send({
  id: 'test',
  body: 'test',
});
```

## Environment Variables

This library can be modified using some env vars

| Environment Variable | Type   | Default | Required | Description                                                          |
| -------------------- | ------ | ------- | -------- | -------------------------------------------------------------------- |
| AWS_REGION           | string | -       | false    | To set the aws region                                                |
| SQS_AWS_ENDPOINT     | string | -       | false    | Set aws sdk endpoint for localstack tests in development environment |

## Building

Run `nx build sqs` to build the library.

## Running unit tests

Run `nx test sqs` to execute the unit tests via [Jest](https://jestjs.io).
