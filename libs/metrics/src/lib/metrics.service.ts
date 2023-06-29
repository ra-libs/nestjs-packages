import { Injectable } from '@nestjs/common';
import { ClientOptions, StatsD } from 'hot-shots';

@Injectable()
export class MetricsService {
  public ddClient: StatsD;

  constructor(options: ClientOptions = {}) {
    if (!options.prefix && !process.env['APP_NAME']) {
      throw new Error(
        'APP_NAME environment variable must be set if prefix is not provided'
      );
    }

    this.ddClient = new StatsD({
      prefix: process.env['APP_NAME'],
      ...options,
    });
  }

  public increment(metric: string, tags?: string[]): void {
    this.ddClient.increment(metric, tags);
  }
}
