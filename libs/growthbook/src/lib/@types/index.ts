import { Attributes as GBAttributes } from '@growthbook/growthbook';

export type Attributes = GBAttributes & {
  customerId?: string;
};

export type ToggleFeatureEnv = {
  production?: boolean;
  dev?: boolean;
};

export type ToggleFeatureBody = {
  reason: string;
  environments: ToggleFeatureEnv;
};
