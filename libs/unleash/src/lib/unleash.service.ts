import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Context, initialize, Unleash, UnleashConfig } from 'unleash-client';
import { FallbackFunction } from 'unleash-client/lib/helpers';

@Injectable()
export class UnleashService {
  private client: Unleash;
  private config: UnleashConfig;

  constructor(config?: UnleashConfig) {
    this.initialize(config);
  }

  private initialize(config?: UnleashConfig) {
    const appName = config?.appName || process.env['UNLEASH_APP_NAME'];
    if (!appName) {
      throw new Error('appName or UNLEASH_APP_NAME env var is required');
    }

    const url = config?.url || process.env['UNLEASH_URL'];
    if (!url) {
      throw new Error('url or UNLEASH_URL env var is required');
    }

    const environment =
      config?.environment || process.env['UNLEASH_ENVIRONMENT'];
    if (!environment) {
      throw new Error('environment or UNLEASH_ENVIRONMENT env var is required');
    }

    const authorization =
      config?.customHeaders?.['Authorization'] ||
      process.env['UNLEASH_AUTHORIZATION'];
    if (!authorization) {
      throw new Error(
        'customHeaders.Authorization or UNLEASH_AUTHORIZATION env var is required'
      );
    }

    this.config = {
      appName,
      url,
      environment,
      customHeaders: {
        Authorization: authorization,
        ...config?.customHeaders,
      },
    };

    this.client = initialize(this.config);
  }

  isEnabled(
    name: string,
    context?: Context,
    fallbackFunction?: FallbackFunction
  ): boolean {
    return this.client.isEnabled(name, context, fallbackFunction);
  }

  async toggleFeatureValue(name: string, toggleValue: string): Promise<string> {
    const baseUrl = process.env['UNLEASH_ADMIN_URL'];

    const requiredEnvVars = [
      'UNLEASH_ADMIN_URL',
      'UNLEASH_ADMIN_AUTHORIZATION',
    ];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`${envVar} env var is required`);
      }
    }

    const requestUrl = `${baseUrl}/features/${name}/environments/${this.config.environment}/${toggleValue}`;
    const headers = {
      Authorization: process.env['UNLEASH_ADMIN_AUTHORIZATION'],
    };

    const { data } = await axios.post(requestUrl, {}, { headers: headers });
    return data;
  }
}
