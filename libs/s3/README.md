# s3

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
npm install @will-bank/s3
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { S3Module } from '@will-bank/s3';

@Module({
  imports: [
    // ...
    S3Module.forFeature({
      bucket: 'your-bucket',
    }),
  ],
})
export class YourModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION
- S3_AWS_ENDPOINT

In your specific service inject the S3Service as follow:

```ts
import { S3Service } from '@will-bank/s3';

@Injectable()
export class YourService {
  constructor(private readonly s3Service: S3Service, private readonly configService: ConfigService) {}

  async xptoMethod() {
    await this.s3Service.get({
      Key: 'file-key',
    });
  }
}
```

> Check the GetObjectCommandInput exported from `@aws-sdk/client-s3` for more input options.

### Node

```ts
import { S3Service } from '@will-bank/s3';

const s3Service = new S3Service({
  bucket: 'your-bucket',
});

await s3Service.get({
  Key: 'file-key',
});
```

## Environment Variables

This library can be modified using some env vars

| Environment Variable | Type   | Default | Required | Description                                                          |
| -------------------- | ------ | ------- | -------- | -------------------------------------------------------------------- |
| AWS_REGION           | string | -       | false    | To set the aws region                                                |
| S3_AWS_ENDPOINT      | string | -       | false    | Set aws sdk endpoint for localstack tests in development environment |

## Building

Run `nx build s3` to build the library.

## Running unit tests

Run `nx test s3` to execute the unit tests via [Jest](https://jestjs.io).
