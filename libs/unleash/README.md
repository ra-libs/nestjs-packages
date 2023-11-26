# unleash

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @ra-libs/unleash
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { UnleashModule } from '@ra-libs/unleash';

@Module({
  imports: [
    // ...
    UnleashModule.forRoot(),
  ],
})
export class AppModule {}
```

You can pass configuration options as an object parameter or it will use by default the environment variables to setup unleash

- UNLEASH_APP_NAME
- UNLEASH_URL
- UNLEASH_ENVIRONMENT
- UNLEASH_AUTHORIZATION

If you want to toggle feature using this library you should add these environment variables:

- UNLEASH_ADMIN_URL
- UNLEASH_ADMIN_AUTHORIZATION

In your specific service inject the UnleashService as follow:

```ts
import { UnleashService } from '@ra-libs/unleash';

@Injectable()
export class YourService {
  constructor(private readonly unleashService: UnleashService) {}

  async xptoMethod() {
    if (this.unleashService.isEnabled('featureFlagX')) {
      // Do something
    }
  }
}
```

### Node

```ts
import { UnleashService } from '@ra-libs/unleash';

const unleashService = new UnleashService();

async function yourMethod() {
  const featureIsOn = unleashService.isEnabled('featureFlagX');

  if (featureIsOn) {
    // Do Something
  }
}
```

## Building

Run `nx build unleash` to build the library.

## Running unit tests

Run `nx test unleash` to execute the unit tests via [Jest](https://jestjs.io).
