import {
  GetSecretValueCommand,
  GetSecretValueCommandInput,
  GetSecretValueCommandOutput,
  SecretsManagerClient,
  SecretsManagerClientConfig,
} from '@aws-sdk/client-secrets-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretsManagerService {
  public client: SecretsManagerClient;

  constructor(configurations: SecretsManagerClientConfig = {}) {
    this.client = new SecretsManagerClient({
      region: configurations.region ?? process.env['AWS_REGION'],
      ...configurations,
    });
  }

  public async getSecretValue(
    input: GetSecretValueCommandInput
  ): Promise<GetSecretValueCommandOutput> {
    const command = new GetSecretValueCommand(input);
    return await this.client.send(command);
  }
}
