# sns

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @ra-libs/sns
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { SNSModule } from '@ra-libs/sns';

@Module({
  imports: [
    // ...
    SNSModule.forRoot(),
  ],
})
export class AppModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION

In your specific service inject the SNSService as follow:

```ts
import { SNSService } from '@ra-libs/sns';

@Injectable()
export class YourService {
  constructor(private readonly snsService: SNSService, private readonly configService: ConfigService) {}

  async xptoMethod() {
    // Do Something
    const message = {
      // your message
    };
    await this.snsService.publish({
      TopicArn: this.configService.get('SNS_TOPIC_ARN'),
      Message: JSON.stringify(message),
    });
  }
}
```

> Check the PublishCommandInput exported from `@aws-sdk/client-sns` for more input options.

### Node

```ts
import { SNSService } from '@ra-libs/sns';

const snsService = new SNSService();

const message = {
  // your message
};

snsService.publish({
  TopicArn: 'topic-arn',
  Message: JSON.stringify(message),
});
```

## Environment Variables

This library can be modified using some env vars

| Environment Variable | Type   | Default | Required | Description                                                          |
| -------------------- | ------ | ------- | -------- | -------------------------------------------------------------------- |
| AWS_REGION           | string | -       | false    | To set the aws region                                                |
| SNS_AWS_ENDPOINT     | string | -       | false    | Set aws sdk endpoint for localstack tests in development environment |

## Building

Run `nx build sns` to build the library.

## Running unit tests

Run `nx test sns` to execute the unit tests via [Jest](https://jestjs.io).
