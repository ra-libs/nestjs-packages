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
      prefix: `${process.env['APP_NAME']}_`,
      maxBufferSize: parseInt(
        process.env['METRICS_MAX_BUFFER_SIZE'] || '10000'
      ),
      bufferFlushInterval: parseInt(
        process.env['METRICS_BUFFER_FLUSH_INTERVAL'] || '5000'
      ),
      ...options,
    });
  }

  public increment(metric: string, tags?: string[]): void {
    this.ddClient.increment(metric, tags);
  }
}
