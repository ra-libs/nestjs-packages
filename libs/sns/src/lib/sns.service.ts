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

    if (
      process.env['AWS_ACCESS_KEY_ID'] &&
      process.env['AWS_SECRET_ACCESS_KEY']
    ) {
      snsOptionsConfig.credentials = {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
      };
    }

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
