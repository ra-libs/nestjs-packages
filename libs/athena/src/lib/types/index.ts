import { StartQueryExecutionCommandInput } from '@aws-sdk/client-athena';

export type ResultConfiguration = Pick<
  StartQueryExecutionCommandInput,
  'ResultConfiguration'
>['ResultConfiguration'];

export type RunQueryOptions = {
  retry?: number;
};

export type Column<C = string> = C;
export type Row<R = any> = R[];

export type ExtractedResult<
  C extends string | number | symbol = any,
  R = any
> = {
  [key in Column<C>]: Row<R>[];
};
