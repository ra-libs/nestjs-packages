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

  private shouldSendMetrics(): boolean {
    if (process.env['METRICS_ENABLED']) {
      return process.env['METRICS_ENABLED'] === 'true';
    }
    return process.env['NODE_ENV'] === 'production';
  }

  public increment(metric: string, tags?: string[]): void {
    if (this.shouldSendMetrics()) {
      this.ddClient.increment(metric, tags);
    }
  }

  public decrement(metric: string, tags?: string[]): void {
    if (this.shouldSendMetrics()) {
      this.ddClient.decrement(metric, tags);
    }
  }

  public histogram(metric: string, value: number, tags?: string[]): void {
    if (this.shouldSendMetrics()) {
      this.ddClient.histogram(metric, value, tags);
    }
  }

  public gauge(metric: string, value: number, tags?: string[]): void {
    if (this.shouldSendMetrics()) {
      this.ddClient.gauge(metric, value, tags);
    }
  }

  public timing(metric: string, value: number, tags?: string[]): void {
    if (this.shouldSendMetrics()) {
      this.ddClient.timing(metric, value, tags);
    }
  }
}
