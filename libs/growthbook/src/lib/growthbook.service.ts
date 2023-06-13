import { GrowthBook, setPolyfills, Context } from '@growthbook/growthbook';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Attributes } from './@types';

@Injectable()
export class GrowthbookService implements OnModuleInit {
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

  async isOn(name: string, attributes: Attributes = {}) {
    const client = new GrowthBook({
      ...this.context,
      ...attributes,
    });
    await client.loadFeatures({ autoRefresh: true });
    return client.isOn(name);
  }
}
