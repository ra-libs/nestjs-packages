# metrics

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @ra-libs/metrics
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

Make sure to add `APP_NAME` as an environment variable, it will be used as a prefix for every metric.

This package uses [hot-shots](https://github.com/brightcove/hot-shots)!

## Environment Variables

This library can be modified using some env vars

| Environment Variable          | Type    | Default | Required | Description                                                                                              |
| ----------------------------- | ------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- |
| APP_NAME                      | string  | -       | true     | To set the metrics prefix, required unless you pass the prefix param                                     |
| METRICS_MAX_BUFFER_SIZE       | number  | 10000   | false    | If larger than 0, metrics will be buffered and only sent when the string length is greater than the size |
| METRICS_BUFFER_FLUSH_INTERVAL | number  | 5000    | false    | If buffering is in use, this is the time in ms to always flush any buffered metrics                      |
| METRICS_ENABLED               | boolean | -       | false    | Enable/Disable send metrics                                                                              |
| NODE_ENV                      | string  | -       | false    | If METRICS_ENABLED not set and NODE_ENV is production, this lib will send metrics                        |

### Nestjs

in your `app.module.ts` import this module

```ts
import { MetricsModule } from '@ra-libs/metrics';

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
import { MetricsService } from '@ra-libs/metrics';

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
import { MetricsService } from '@ra-libs/metrics';

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
