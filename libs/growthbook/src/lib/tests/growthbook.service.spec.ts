import { Test, TestingModule } from '@nestjs/testing';

import { GROWTHTBOOK_CLIENT } from '../growthbook.constants';
import { GrowthbookService } from '../growthbook.service';

describe('GrowthbookService', () => {
  let growthbookService: GrowthbookService;
  const growthbookClientMock = {
    isOn: jest.fn().mockReturnThis(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GROWTHTBOOK_CLIENT,
          useValue: growthbookClientMock,
        },
        GrowthbookService,
      ],
    }).compile();

    growthbookService = module.get<GrowthbookService>(GrowthbookService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(growthbookService).toBeDefined();
  });

  it('should call isOn', () => {
    growthbookService.isOn('test');
    expect(growthbookClientMock.isOn).toBeCalledWith('test');
  });
});
