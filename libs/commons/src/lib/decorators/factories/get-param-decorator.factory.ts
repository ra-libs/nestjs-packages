import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

// eslint-disable-next-line @typescript-eslint/ban-types
export function getParamDecoratorFactory(decorator: Function) {
  class Test {
    // eslint-disable-next-line
    public test(@decorator() value: any) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}
