import { Context, GrowthBook, setPolyfills } from '@growthbook/growthbook';
import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

import { Attributes, ToggleFeatureBody } from './@types';

@Injectable()
export class GrowthbookService<
  AppFeatures extends Record<string, any> = Record<string, any>
> implements OnModuleInit
{
  private startDebounceTime = 0;
  private endDebounceTime = 0;

  constructor(private context: Context = {}) {}

  async onModuleInit() {
    const crossFetch = await import('cross-fetch');
    const nodeCrypto = await import('node:crypto');
    const eventsource = await import('eventsource');

    const cache = new Map();

    setPolyfills({
      // Required when using built-in feature loading and Node 17 or lower
      fetch: crossFetch,
      // Required when using encrypted feature flags and Node 18 or lower
      SubtleCrypto: nodeCrypto.webcrypto.subtle,
      // Optional, can make feature rollouts faster
      EventSource: eventsource,
      localStorage: {
        getItem: (key) => cache.get(key),
        setItem: (key, value) => {
          cache.set(key, value);
        },
      },
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

  public async createClientInstance(attributes: Attributes = {}) {
    const context = this.getContext();
    const client = new GrowthBook({
      ...context,
      attributes: {
        ...context.attributes,
        ...attributes,
      },
    });
    await client.loadFeatures();
    return client;
  }

  async isOn<K extends string & keyof AppFeatures = string>(
    key: K,
    attributes: Attributes = {}
  ) {
    const client = await this.createClientInstance(attributes);
    const isOnResult = client.isOn<K>(key);
    client.destroy();
    return isOnResult;
  }

  async getFeatureValue<
    V extends AppFeatures[K],
    K extends string & keyof AppFeatures = string
  >(key: K, defaultValue: V, attributes: Attributes = {}) {
    const client = await this.createClientInstance(attributes);
    const featureValue = client.getFeatureValue<V, K>(key, defaultValue);
    client.destroy();
    return featureValue;
  }

  /**
   *
   * @param key
   * @param body
   * @param debounceTimeMs  set debounce time to prevent multiple calls to API at once (default 0), useful for 429 errors
   * @returns
   */
  async toggleFeatureValue(
    key: string,
    body: ToggleFeatureBody,
    debounceTimeMs = 0
  ) {
    let triggerAPI = true;

    if (debounceTimeMs > 0) {
      const now = Date.now();
      if (this.startDebounceTime == 0 || now > this.endDebounceTime) {
        this.startDebounceTime = now;
        this.endDebounceTime = now + debounceTimeMs;
      } else {
        triggerAPI = false;
      }
    }

    if (triggerAPI) {
      const baseUrl =
        this.context.apiHost || process.env['GROWTHBOOK_API_HOST'];
      const accessToken = process.env['GROWTHBOOK_API_ACCESS_TOKEN'];

      const requestUrl = `${baseUrl}/api/v1/features/${key}/toggle`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const { data } = await axios.post(requestUrl, body, { headers: headers });
      return data;
    } else {
      return {
        message: 'Debounce time not elapsed',
      };
    }
  }
}
