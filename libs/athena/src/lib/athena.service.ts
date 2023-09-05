import {
  AthenaClient,
  AthenaClientConfig,
  CreateNamedQueryCommand,
  CreateNamedQueryInput,
  CreateNamedQueryOutput,
  GetQueryExecutionCommand,
  GetQueryExecutionInput,
  GetQueryExecutionOutput,
  GetQueryResultsCommand,
  GetQueryResultsInput,
  GetQueryResultsOutput,
  StartQueryExecutionCommand,
  StartQueryExecutionInput,
  StartQueryExecutionOutput,
} from '@aws-sdk/client-athena';
import { Injectable } from '@nestjs/common';

import { ExtractedResult, ResultConfiguration, RunQueryOptions } from './types';

@Injectable()
export class AthenaService {
  public client: AthenaClient;
  private resultConfiguration: ResultConfiguration;

  constructor(configurations: AthenaClientConfig = {}) {
    const athenaClientConfig: AthenaClientConfig = {};
    if (process.env['AWS_REGION'])
      athenaClientConfig.region = process.env['AWS_REGION'];

    if (
      process.env['AWS_ACCESS_KEY_ID'] &&
      process.env['AWS_SECRET_ACCESS_KEY']
    ) {
      athenaClientConfig.credentials = {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      };
    }

    this.client = new AthenaClient({
      ...athenaClientConfig,
      ...configurations,
    });
  }

  async createNamedQuery(
    input: CreateNamedQueryInput
  ): Promise<CreateNamedQueryOutput> {
    const command = new CreateNamedQueryCommand(input);
    return this.client.send(command);
  }

  async getQueryResults(
    input: GetQueryResultsInput
  ): Promise<GetQueryResultsOutput> {
    const command = new GetQueryResultsCommand(input);
    return this.client.send(command);
  }

  async startQueryExecution(
    input: StartQueryExecutionInput
  ): Promise<StartQueryExecutionOutput> {
    const command = new StartQueryExecutionCommand(input);
    return this.client.send(command);
  }

  async getQueryExecution(
    input: GetQueryExecutionInput
  ): Promise<GetQueryExecutionOutput> {
    const command = new GetQueryExecutionCommand(input);
    return this.client.send(command);
  }

  setResultConfiguration(resultConfiguration: ResultConfiguration) {
    this.resultConfiguration = resultConfiguration;
  }

  async runQuery(
    query: string,
    options: RunQueryOptions = { retry: 2000 }
  ): Promise<GetQueryResultsOutput> {
    const { retry } = options;
    const { QueryExecutionId } = await this.startQueryExecution({
      QueryString: query,
      ResultConfiguration: this.resultConfiguration,
    });

    if (!QueryExecutionId) throw new Error('QueryExecutionId not found');
    return this.waitForQueryResults(QueryExecutionId, retry);
  }

  async waitForQueryResults(queryExecutionId: string, retry = 2000) {
    return new Promise<GetQueryResultsOutput>((resolve, reject) => {
      const interval = setInterval(async () => {
        const { QueryExecution } = await this.getQueryExecution({
          QueryExecutionId: queryExecutionId,
        });

        if (QueryExecution?.Status?.State === 'SUCCEEDED') {
          clearInterval(interval);
          const results = await this.getQueryResults({
            QueryExecutionId: queryExecutionId,
          });

          return resolve(results);
        }

        if (QueryExecution?.Status?.State === 'FAILED') {
          clearInterval(interval);
          reject(QueryExecution.Status.StateChangeReason);
        }
      }, retry);
    });
  }

  extractResult<T = any>(results: GetQueryResultsOutput): ExtractedResult<T> {
    const athenaColumns = results.ResultSet?.Rows?.shift();

    const columns = athenaColumns?.Data?.map((data) => {
      return Object.values(data)[0];
    });

    const rows = results.ResultSet?.Rows?.map((row) => {
      return row.Data?.map((data) => {
        return Object.values(data)[0];
      });
    });

    const resultsObject = columns?.reduce((acc, column, index) => {
      acc[column] = rows?.map((row) => {
        return row?.[index];
      });
      return acc;
    }, {});
    return resultsObject;
  }
}
