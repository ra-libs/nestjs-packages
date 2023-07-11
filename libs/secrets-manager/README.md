# secrets-manager

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
npm install @will-bank/secrets-manager
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { SecretsManagerModule } from '@will-bank/secrets-manager';

@Module({
  imports: [
    // ...
    SecretsManagerModule.forRoot(),
  ],
})
export class AppModule {}
```

You can pass configurations options as an object parameter. By default this module uses environment variables

- AWS_REGION

In your specific service inject the SecretsManagerService as follow:

```ts
import { SecretsManagerService } from '@will-bank/secrets-manager';

@Injectable()
export class YourService {
  constructor(private readonly secretsManagerService: SecretsManagerService, private readonly configService: ConfigService) {}

  async function mySecrets(secretName) {
    const secret = await secretsManagerService.getSecretValue({
      SecretId: secretName,
    });
    return JSON.parse(secret.SecretString);
  }
}
```

> Check the GetSecretValueCommandInput exported from `@aws-sdk/client-secrets-manager` for more input options.

### Node

```ts
import { SecretsManagerService } from '@will-bank/secrets-manager';

const secretsManagerService = new SecretsManagerService();

async function mySecrets(secretName) {
  const secret = await secretsManagerService.getSecretValue({
    SecretId: secretName,
  });
  return JSON.parse(secret.SecretString);
}
```

## Building

Run `nx build secrets-manager` to build the library.

## Running unit tests

Run `nx test secrets-manager` to execute the unit tests via [Jest](https://jestjs.io).
