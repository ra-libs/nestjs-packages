import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { GrowthbookService } from '../growthbook.service';
import { GrowthBook } from '@growthbook/growthbook';

const growthbookClientMock = createMock<GrowthBook>();

jest.mock('@growthbook/growthbook', () => ({
  GrowthBook: jest.fn().mockImplementation(() => growthbookClientMock),
  setPolyfills: jest.fn(),
}));

describe('GrowthbookService', () => {
  let growthbookService: GrowthbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GrowthbookService,
          useFactory: () => {
            return new GrowthbookService({
              apiHost: 'test',
              clientKey: 'test',
            });
          },
        },
      ],
    }).compile();

    growthbookService = module.get<GrowthbookService>(GrowthbookService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(growthbookService).toBeDefined();
  });

  it('should call isOn', async () => {
    await growthbookService.isOn('test');
    expect(growthbookClientMock.loadFeatures).toBeCalledTimes(1);
    expect(growthbookClientMock.isOn).toBeCalledWith('test');
  });
});
