# metrics

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
npm install @will-bank/metrics
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

Make sure to add `APP_NAME` as an environment variable, it will be used as a prefix for every metric.

This package uses [hot-shots](https://github.com/brightcove/hot-shots)!

### Nestjs

in your `app.module.ts` import this module

```ts
import { MetricsModule } from '@will-bank/metrics';

@Module({
  imports: [
    // ...
    MetricsModule.forRoot(),
  ],
})
export class AppModule {}
```

You can pass configuration options as an object parameter or it will use by default the environment variables to setup Datadog metrics

In your specific service inject the GrowthbookService as follow:

```ts
import { MetricsService } from '@will-bank/metrics';

@Injectable()
export class YourService {
  constructor(private readonly metricsService: MetricsService) {}

  async xptoMethod() {
    // Do Something
    this.metricsService.increment('metric_name');

    // Any method not implemented by MetricsService but hot-shots does
    this.metricsService.ddClient.event('my_title', 'description');
  }
}
```

### Node

```ts
import { MetricsService } from '@will-bank/metrics';

const metricsService = new MetricsService();

async function yourMethod() {
  metricsService.increment('metric_name');

  // Any method not implemented by MetricsService but hot-shots does
  metricsService.ddClient.event('my_title', 'description');
}
```

## Building

Run `nx build metrics` to build the library.

## Running unit tests

Run `nx test metrics` to execute the unit tests via [Jest](https://jestjs.io).
