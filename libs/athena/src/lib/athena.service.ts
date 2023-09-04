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

@Injectable()
export class AthenaService {
  public client: AthenaClient;

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

    // if(process.env['ATHENA_AWS_ENDPOINT'])

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
}
