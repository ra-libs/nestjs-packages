import { Attributes as GBAttributes } from '@growthbook/growthbook';

export type Attributes = GBAttributes & {
  customerId?: string;
};
