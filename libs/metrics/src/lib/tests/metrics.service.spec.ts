import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { MetricsService } from '../metrics.service';
import { StatsD } from 'hot-shots';

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
});
