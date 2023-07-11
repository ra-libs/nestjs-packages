import {
  GetParameterCommand,
  GetParameterCommandInput,
  GetParameterCommandOutput,
  GetParametersByPathCommand,
  GetParametersByPathCommandInput,
  GetParametersByPathCommandOutput,
  SSMClient,
  SSMClientConfig,
} from '@aws-sdk/client-ssm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SSMService {
  public client: SSMClient;

  constructor(configurations: SSMClientConfig = {}) {
    this.client = new SSMClient({
      region: configurations.region ?? process.env['AWS_REGION'],
      ...configurations,
    });
  }

  async getParameter(
    input: GetParameterCommandInput
  ): Promise<GetParameterCommandOutput> {
    const command = new GetParameterCommand(input);
    return await this.client.send<
      GetParameterCommandInput,
      GetParameterCommandOutput
    >(command as any);
  }

  async getParametersByPath(
    input: GetParametersByPathCommandInput
  ): Promise<GetParametersByPathCommandOutput> {
    const command = new GetParametersByPathCommand(input);
    return await this.client.send<
      GetParametersByPathCommandInput,
      GetParametersByPathCommandOutput
    >(command as any);
  }
}
