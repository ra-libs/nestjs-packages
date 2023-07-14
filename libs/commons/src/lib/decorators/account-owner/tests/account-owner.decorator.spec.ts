import { getParamDecoratorFactory } from '../../factories/get-param-decorator.factory';
import { AccountOwner } from '../account-owner.decorator';
import { accountOwnerFactory } from './factories/account-owner-factory';
import { xDataHashHeaderFromRequestDtoFactory } from './factories/xdata-hash-header.factory';

describe('Account Owner Decorator', () => {
  it('should extract account owner correctly from request', () => {
    const accountOwner = accountOwnerFactory();
    const xDataHash = xDataHashHeaderFromRequestDtoFactory(accountOwner);
    const mockExecutionContext = {
      switchToHttp: () => {
        return mockExecutionContext;
      },
      getRequest: () => {
        return {
          headers: {
            ...xDataHash,
          },
        };
      },
    };

    const decoratorFactory = getParamDecoratorFactory(AccountOwner);
    const result = decoratorFactory(null, mockExecutionContext);

    expect(result).toStrictEqual(accountOwner);
  });
});
