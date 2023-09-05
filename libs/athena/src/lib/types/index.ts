import { StartQueryExecutionCommandInput } from '@aws-sdk/client-athena';

export type ResultConfiguration = Pick<
  StartQueryExecutionCommandInput,
  'ResultConfiguration'
>['ResultConfiguration'];

export type RunQueryOptions = {
  retry?: number;
};

export type Column = string;
export type Row<T = any> = T[];

export type ExtractedResult<T = any> = {
  [key: Column]: Row<T>[];
};
