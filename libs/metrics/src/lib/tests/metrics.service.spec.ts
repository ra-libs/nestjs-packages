import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { StatsD } from 'hot-shots';

import { MetricsService } from '../metrics.service';

const statsDMock = createMock<StatsD>();

jest.mock('hot-shots', () => ({
  StatsD: jest.fn().mockImplementation(() => statsDMock),
}));

describe('MetricsService', () => {
  let metricsService: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MetricsService,
          useFactory: () => {
            return new MetricsService({
              prefix: 'test',
            });
          },
        },
      ],
    }).compile();

    metricsService = module.get<MetricsService>(MetricsService);

    // Mock process.env.METRICS_ENABLED to be true
    process.env['METRICS_ENABLED'] = 'true';

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(metricsService).toBeDefined();
  });

  it('should throw an error if prefix is not provided', () => {
    expect(() => {
      new MetricsService();
    }).toThrowError(
      'APP_NAME environment variable must be set if prefix is not provided'
    );
  });

  describe('increment', () => {
    it('should call ddClient.increment', () => {
      metricsService.increment('test');
      expect(statsDMock.increment).toHaveBeenCalledTimes(1);
      expect(statsDMock.increment).toHaveBeenCalledWith('test', undefined);
    });

    it('should call ddClient.increment with tags', () => {
      metricsService.increment('test', ['tag1', 'tag2']);
      expect(statsDMock.increment).toHaveBeenCalledTimes(1);
      expect(statsDMock.increment).toHaveBeenCalledWith('test', [
        'tag1',
        'tag2',
      ]);
    });
  });

  describe('decrement', () => {
    it('should call ddClient.decrement', () => {
      metricsService.decrement('test');
      expect(statsDMock.decrement).toHaveBeenCalledTimes(1);
      expect(statsDMock.decrement).toHaveBeenCalledWith('test', undefined);
    });

    it('should call ddClient.decrement with tags', () => {
      metricsService.decrement('test', ['tag1', 'tag2']);
      expect(statsDMock.decrement).toHaveBeenCalledTimes(1);
      expect(statsDMock.decrement).toHaveBeenCalledWith('test', [
        'tag1',
        'tag2',
      ]);
    });
  });

  describe('histogram', () => {
    it('should call ddClient.histogram', () => {
      metricsService.histogram('test', 1);
      expect(statsDMock.histogram).toHaveBeenCalledTimes(1);
      expect(statsDMock.histogram).toHaveBeenCalledWith('test', 1, undefined);
    });

    it('should call ddClient.histogram with tags', () => {
      metricsService.histogram('test', 1, ['tag1', 'tag2']);
      expect(statsDMock.histogram).toHaveBeenCalledTimes(1);
      expect(statsDMock.histogram).toHaveBeenCalledWith('test', 1, [
        'tag1',
        'tag2',
      ]);
    });
  });

  describe('gauge', () => {
    it('should call ddClient.gauge', () => {
      metricsService.gauge('test', 1);
      expect(statsDMock.gauge).toHaveBeenCalledTimes(1);
      expect(statsDMock.gauge).toHaveBeenCalledWith('test', 1, undefined);
    });

    it('should call ddClient.gauge with tags', () => {
      metricsService.gauge('test', 1, ['tag1', 'tag2']);
      expect(statsDMock.gauge).toHaveBeenCalledTimes(1);
      expect(statsDMock.gauge).toHaveBeenCalledWith('test', 1, [
        'tag1',
        'tag2',
      ]);
    });
  });

  describe('timing', () => {
    it('should call ddClient.timing', () => {
      metricsService.timing('test', 1);
      expect(statsDMock.timing).toHaveBeenCalledTimes(1);
      expect(statsDMock.timing).toHaveBeenCalledWith('test', 1, undefined);
    });

    it('should call ddClient.timing with tags', () => {
      metricsService.timing('test', 1, ['tag1', 'tag2']);
      expect(statsDMock.timing).toHaveBeenCalledTimes(1);
      expect(statsDMock.timing).toHaveBeenCalledWith('test', 1, [
        'tag1',
        'tag2',
      ]);
    });
  });
});
