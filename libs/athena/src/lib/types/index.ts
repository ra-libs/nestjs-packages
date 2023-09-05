import { StartQueryExecutionCommandInput } from '@aws-sdk/client-athena';

export type ResultConfiguration = Pick<
  StartQueryExecutionCommandInput,
  'ResultConfiguration'
>['ResultConfiguration'];
