# growthbook

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
npm install @will-bank/growthbook
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `app.module.ts` import this module

```ts
import { GrowthbookModule } from '@will-bank/growthbook';

@Module({
  imports: [
    // ...
    GrowthbookModule.forRoot(),
  ],
})
export class AppModule {}
```

You can pass configuration options as an object parameter or it will use by default the environment variables to setup growthbook

- GROWTHBOOK_API_HOST
- GROWTHBOOK_CLIENT_KEY

In your specific service inject the GrowthbookService as follow:

```ts
@Injectable()
export class YourService {
  constructor(private readonly growthbookService: GrowthbookService) {}

  async xptoMethod() {
    if (
      await this.growthbookService.isOn('featureFlagX', {
        // attributes
        customerId: 'ABC',
      })
    ) {
      // Do something
    }
  }
}
```

### Node

```ts
import { GrowthbookService } from '@will-bank/growthbook';

const growthbookService = new GrowthbookService();

async function yourMethod() {
  const featureIsOn = await growthbookService.isOn('featureFlagX', {
    // attributes
    customerID: '123',
  });

  if (featureIsOn) {
    // Do Something
  }
}
```

## Building

Run `nx build growthbook` to build the library.

## Running unit tests

Run `nx test growthbook` to execute the unit tests via [Jest](https://jestjs.io).
