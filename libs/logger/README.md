# logger

This library was generated with [Nx](https://nx.dev).

This logger uses [winston](https://www.npmjs.com/package/winston), you can customize its transports, format and any other option that winston supports.

Using this library will make it easier to filter logs in datadog.

## Installing this package

```bash
pnpm add @will-bank/logger
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Nestjs

in your `main.ts`

```ts
import { Logger } from '@will-bank/logger`

async function bootstrap(){
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
}

```

This will override the application logger.

#### Per service

in your specifc service

```ts
import { Logger } from '@will-bank/logger';

@Injectable()
export class YourCustomService {
  private readonly logger = new Logger(YourCustomService.name);

  yourMethod() {
    this.logger.log('XPTO');
  }
}
```

or you can use dependecy-injection, in your module add:

```ts
import { LoggerModule } from '@will-bank/logger';

@Module({
  imports: [LoggerModule.forFeature('YourCustomService')],
})
export class YourCustomModule {}
```

in your service:

```ts
import { Logger } from '@will-bank/logger';

@Injectable()
export class YourCustomService {
  constructor(private readonly logger: Logger) {}

  yourMethod() {
    this.logger.log('Hello World!');
  }
}
```

## Node

```ts
import { Logger } from '@will-bank/logger';

const logger = new Logger('Your Custom Logger');

logger.error('Unexpected error!', new Error('Ops..'));
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
