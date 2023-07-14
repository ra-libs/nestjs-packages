import { faker } from '@faker-js/faker';

import { AccountOwnerData } from '../../@types';
import { accountOwnerFactory } from './account-owner-factory';

export const xDataObjectFactory = (accountOwner?: AccountOwnerData) => {
  return {
    accessPublic: {
      sub: accountOwner?.customerId ?? faker.datatype.uuid(),
      name: accountOwner?.name ?? faker.name.fullName(),
      email: accountOwner?.email ?? faker.internet.email(),
    },
    accessPrivate: {
      username: accountOwner?.documentNumber ?? faker.finance.accountNumber(),
      cfi: {
        account:
          accountOwner?.account?.slice(0, accountOwner.account.length - 1) ??
          faker.datatype.number.toString(),
        digit:
          accountOwner?.account?.slice(-1) ?? faker.datatype.number.toString(),
      },
    },
  };
};

export const xDataHashHeaderFromRequestDtoFactory = (
  accountOwner?: AccountOwnerData
) => {
  const accountOwnerToBeHashed = accountOwner ?? accountOwnerFactory();
  const xDataObject = xDataObjectFactory(accountOwnerToBeHashed);
  const encodedDataHash = Buffer.from(JSON.stringify(xDataObject)).toString(
    'base64'
  );

  return {
    'x-data-hash': encodedDataHash,
  };
};
