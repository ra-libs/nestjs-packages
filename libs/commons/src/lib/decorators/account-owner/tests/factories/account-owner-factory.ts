import { faker } from '@faker-js/faker';

import { AccountOwnerData } from '../../@types';

export const accountOwnerFactory = (
  documentNumber?: string
): AccountOwnerData => {
  return {
    customerId: faker.string.uuid(),
    name: faker.person.fullName(),
    documentNumber: documentNumber ?? faker.finance.accountNumber(),
    account: faker.finance.accountNumber(),
    email: faker.internet.email(),
  };
};
