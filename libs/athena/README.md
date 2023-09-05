# athena

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @will-bank/athena
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { AthenaModule } from '@will-bank/athena';

@Module({
  imports: [
    // ...
    AthenaModule.forFeature(),
  ],
})
export class YourModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

In your specific service inject the S3Service as follow:

```ts
import { AthenaService } from '@will-bank/athena';

@Injectable()
export class YourService {
  constructor(private readonly athenaService: AthenaService, private readonly configService: ConfigService) {}

  async xptoMethod() {
    const results = await this.athenaService.runQuery({
      QueryString: 'Your Query',
    });
  }
}
```

### Node

```ts
import { AthenaService } from '@will-bank/athena';

const athenaService = new AthenaService();

const results = await athenaService.runQuery({
  QueryString: 'Your Query',
});
```

## Environment Variables

This library can be modified using some env vars

| Environment Variable  | Type   | Default | Required | Description               |
| --------------------- | ------ | ------- | -------- | ------------------------- |
| AWS_REGION            | string | -       | false    | To set the aws region     |
| AWS_ACCESS_KEY_ID     | string | -       | false    | Set aws sdk access key id |
| AWS_SECRET_ACCESS_KEY | string | -       | false    | Set aws sdk secret access |

## Building

Run `nx build athena` to build the library.

## Running unit tests

Run `nx test athena` to execute the unit tests via [Jest](https://jestjs.io).
