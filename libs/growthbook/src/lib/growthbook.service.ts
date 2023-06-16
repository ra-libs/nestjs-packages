import { GrowthBook, setPolyfills, Context } from '@growthbook/growthbook';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Attributes } from './@types';

@Injectable()
export class GrowthbookService<
  AppFeatures extends Record<string, any> = Record<string, any>
> implements OnModuleInit
{
  constructor(private context: Context) {}

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

  private async createClientInstance(attributes: Attributes = {}) {
    const client = new GrowthBook({
      ...this.context,
      attributes: {
        ...this.context.attributes,
        ...attributes,
      },
    });
    await client.loadFeatures({ autoRefresh: true });
    return client;
  }

  async isOn<K extends string & keyof AppFeatures = string>(
    key: K,
    attributes: Attributes = {}
  ) {
    const client = await this.createClientInstance(attributes);
    return client.isOn<K>(key);
  }

  async getFeatureValue<
    V extends AppFeatures[K],
    K extends string & keyof AppFeatures = string
  >(key: K, defaultValue: V, attributes: Attributes = {}) {
    const client = await this.createClientInstance(attributes);
    return client.getFeatureValue<V, K>(key, defaultValue);
  }
}
