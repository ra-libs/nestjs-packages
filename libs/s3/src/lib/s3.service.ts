import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectOutput,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectOutput,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
  protected bucket: string;
  public client: S3Client;

  constructor(bucket: string, configurations: S3ClientConfig = {}) {
    this.bucket = bucket;
    const s3ClientConfig: S3ClientConfig = {};
    if (process.env['AWS_REGION'])
      s3ClientConfig.region = process.env['AWS_REGION'];
    if (process.env['S3_AWS_ENDPOINT'])
      s3ClientConfig.endpoint = process.env['S3_AWS_ENDPOINT'];

    this.client = new S3Client({
      ...s3ClientConfig,
      ...configurations,
    });
  }

  async get(
    input: Omit<GetObjectCommandInput, 'Bucket'>
  ): Promise<GetObjectOutput> {
    const commandInput: GetObjectCommandInput = {
      Bucket: this.bucket,
      ...input,
    };

    const command = new GetObjectCommand(commandInput);
    return this.client.send(command);
  }

  async put(
    input: Omit<PutObjectCommandInput, 'Bucket'>
  ): Promise<PutObjectOutput> {
    const commandInput: PutObjectCommandInput = {
      Bucket: this.bucket,
      ...input,
    };

    const command = new PutObjectCommand(commandInput);
    return this.client.send(command);
  }

  async delete(
    input: Omit<DeleteObjectCommandInput, 'Bucket'>
  ): Promise<DeleteObjectOutput> {
    const commandInput: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      ...input,
    };

    const command = new DeleteObjectCommand(commandInput);
    return this.client.send(command);
  }

  getUrl(fileName: string): string {
    return `https://${this.bucket}.s3.amazonaws.com/${fileName}`;
  }

  getFileKey(fileURL: string): string {
    const splitted = fileURL.split('/');
    return splitted[splitted.length - 1];
  }
}
