import { StartQueryExecutionCommandInput } from '@aws-sdk/client-athena';

export type ResultConfiguration = Pick<
  StartQueryExecutionCommandInput,
  'ResultConfiguration'
>['ResultConfiguration'];

export type RunQueryOptions = {
  retry?: number;
};

export type Column = string;
export type Row = unknown[];

export type ExtractedResult = {
  [key: Column]: Row[];
};
