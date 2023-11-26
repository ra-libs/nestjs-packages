# logger


This library was generated with [Nx](https://nx.dev).

This logger uses [winston](https://www.npmjs.com/package/winston), you can customize its transports, format and any other option that winston supports.

Using this library will make it easier to filter logs in datadog.

## Installing this package

```bash
pnpm add @ra-libs/logger
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `main.ts`

```ts
import { NestjsLoggerServiceAdapter } from '@ra-libs/logger`

async function bootstrap(){
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(NestjsLoggerServiceAdapter));
}

```

This will override the application logger.

in your `app.module.ts`

```ts
import { LoggerModule } from '@ra-libs/logger';

@Module({
  imports: [LoggerModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
```

This will initialize all the logger dependencies providers

#### Per service

in your specifc service

```ts
import { Logger, LoggerKey } from '@ra-libs/logger';

@Injectable()
export class YourCustomService {
  @Inject(LoggerKey) logger: Logger;

  yourMethod() {
    this.logger.info('XPTO', {
      props: {
        foo: 'foo',
      },
    });
  }
}
```

## Node

```ts
import { WinstonLogger } from '@ra-libs/logger';

const logger = new WinstonLogger();

logger.error('Unexpected error!', {
  error: new Error('Ops..'),
});
```

## Specs

By default this logger uses format.json() passing these fields

```json
{
  "level": "", // info, warn, error or debug
  "message": "",
  "error": "",
  "timestamp": "",
  "context": ""
}
```

It also shows the stack in case of error.

## Building

Run `nx build logger` to build the library.

## Running unit tests

Run `nx test logger` to execute the unit tests via [Jest](https://jestjs.io).
