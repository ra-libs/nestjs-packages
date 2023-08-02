import {
  PublishCommand,
  PublishCommandInput,
  PublishCommandOutput,
  SNSClient,
  SNSClientConfig,
} from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SNSService {
  public client: SNSClient;

  constructor(configurations: SNSClientConfig = {}) {
    const snsOptionsConfig: SNSClientConfig = {};
    if (process.env['AWS_REGION'])
      snsOptionsConfig.region = process.env['AWS_REGION'];
    if (process.env['SNS_AWS_ENDPOINT'])
      snsOptionsConfig.endpoint = process.env['SNS_AWS_ENDPOINT'];

    this.client = new SNSClient({
      ...snsOptionsConfig,
      ...configurations,
    });
  }

  async publish(input: PublishCommandInput): Promise<PublishCommandOutput> {
    const command = new PublishCommand(input);
    return await this.client.send(command);
  }
}
