import { Context, GrowthBook, setPolyfills } from '@growthbook/growthbook';
import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

import { Attributes, ToggleFeatureBody } from './@types';

@Injectable()
export class GrowthbookService<
  AppFeatures extends Record<string, any> = Record<string, any>
> implements OnModuleInit
{
  constructor(private context: Context = {}) {}

  async onModuleInit() {
    const crossFetch = await import('cross-fetch');
    const nodeCrypto = await import('node:crypto');
    const eventsource = await import('eventsource');
    setPolyfills({
      // Required when using built-in feature loading and Node 17 or lower
      fetch: crossFetch,
      // Required when using encrypted feature flags and Node 18 or lower
      SubtleCrypto: nodeCrypto.webcrypto.subtle,
      // Optional, can make feature rollouts faster
      EventSource: eventsource,
    });
  }

  private getContext(): Context {
    return {
      apiHost: this.context.apiHost || process.env['GROWTHBOOK_API_HOST'],
      clientKey: this.context.clientKey || process.env['GROWTHBOOK_CLIENT_KEY'],
      enableDevMode:
        this.context.enableDevMode || process.env['NODE_END'] === 'development',
      ...this.context,
    };
  }

  public async createClientInstance(
    attributes: Attributes = {},
    skipCache = false
  ) {
    const context = this.getContext();
    const client = new GrowthBook({
      ...context,
      attributes: {
        ...context.attributes,
        ...attributes,
      },
    });
    await client.loadFeatures({ autoRefresh: true, skipCache: skipCache });
    return client;
  }

  async isOn<K extends string & keyof AppFeatures = string>(
    key: K,
    attributes: Attributes = {},
    skipCache = false
  ) {
    const client = await this.createClientInstance(attributes, skipCache);
    const isOnResult = client.isOn<K>(key);
    client.destroy();
    return isOnResult;
  }

  async getFeatureValue<
    V extends AppFeatures[K],
    K extends string & keyof AppFeatures = string
  >(key: K, defaultValue: V, attributes: Attributes = {}, skipCache = false) {
    const client = await this.createClientInstance(attributes, skipCache);
    const featureValue = client.getFeatureValue<V, K>(key, defaultValue);
    client.destroy();
    return featureValue;
  }

  async toggleFeatureValue(key: string, body: ToggleFeatureBody) {
    const baseUrl = this.context.apiHost || process.env['GROWTHBOOK_API_HOST'];
    const accessToken = process.env['GROWTHBOOK_API_ACCESS_TOKEN'];

    const requestUrl = `${baseUrl}/api/v1/features/${key}/toggle`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const { data } = await axios.post(requestUrl, body, { headers: headers });
    return data;
  }
}
