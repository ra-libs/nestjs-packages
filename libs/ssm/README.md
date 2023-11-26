# ssm

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @ra-libs/ssm
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { SSMModule } from '@ra-libs/ssm';

@Module({
  imports: [
    // ...
    SSMModule.forRoot(),
  ],
})
export class AppModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION

In your specific service inject the SSMService as follow:

```ts
import { SSMService } from '@ra-libs/ssm';

@Injectable()
export class YourService {
  constructor(private readonly ssmService: SSMService, private readonly configService: ConfigService) {}

  async xptoMethod() {
    // Do Something
    const message = {
      // your message
    };
    const response = await this.ssmService.getParametersByPath({
      Path: '<your-config-path>',
    });
  }
}
```

> Check the CommandInputs exported from `@aws-sdk/client-ssm` for more input options.

### Node

```ts
import { SSMService } from '@ra-libs/ssm';

const ssmService = new SSMService();

const response = await ssmService.getParametersByPath({
  Path: '<your-config-path>',
});
```

## Building

Run `nx build ssm` to build the library.

## Running unit tests

Run `nx test ssm` to execute the unit tests via [Jest](https://jestjs.io).
