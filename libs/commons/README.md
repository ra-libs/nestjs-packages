# commons

This library was generated with [Nx](https://nx.dev).

## Installing this package

```bash
pnpm add @will-bank/commons
```

> Make sure to create your `.npmrc` correctly. check this [documentation](../../docs/NPMRC.md)

## Usage

### Decorators

#### _RequestId_

This decorator will extract the `x-request-id` from the request headers if it exists, otherwise, it will generate a new one using uuid v4.

> You can specify the header request key using environment variable `REQUEST_ID_HEADER_KEY`

In your specific controller add the RequestId decorator

```ts
import { RequestId } from '@will-bank/commons';

@Controller('XPTO')
export class YourController {
  async xptoMethod(@RequestId() requestId: string) {
    // Use the requestId
    // ..
  }
}
```

### Middleware

#### RequestMiddleware

```ts
import { RequestLoggerMiddleware } from '@will-bank/commons';

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).exclude('/health', '/health/*').forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
```

## Building

Run `nx build commons` to build the library.

## Running unit tests

Run `nx test commons` to execute the unit tests via [Jest](https://jestjs.io).
