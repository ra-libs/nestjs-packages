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
  private client: SNSClient;

  constructor(configurations: SNSClientConfig) {
    this.client = new SNSClient(configurations);
  }

  async publish(input: PublishCommandInput): Promise<PublishCommandOutput> {
    const command = new PublishCommand(input);
    return await this.client.send(command);
  }
}
