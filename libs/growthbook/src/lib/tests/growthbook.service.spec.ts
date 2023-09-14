import { createMock } from '@golevelup/ts-jest';
import { GrowthBook } from '@growthbook/growthbook';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios, { Axios } from 'axios';

import { ToggleFeatureBody } from '../@types';
import { GrowthbookService } from '../growthbook.service';

const growthbookClientMock = createMock<GrowthBook>();
jest.mock('axios');
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

  describe('isOn', () => {
    it('should call isOn', async () => {
      await growthbookService.isOn('test');
      expect(growthbookClientMock.loadFeatures).toBeCalledTimes(1);
      expect(growthbookClientMock.isOn).toBeCalledWith('test');
    });

    it('should call isOn with attributes', async () => {
      const gbMock = jest.requireMock('@growthbook/growthbook');
      const attributes = { customerId: '22ac469f-5d20-42c0-aaae-5634571ebc9d' };

      await growthbookService.isOn('test', attributes);

      expect(growthbookClientMock.loadFeatures).toBeCalledTimes(1);
      expect(growthbookClientMock.isOn).toBeCalledWith('test');
      expect(gbMock.GrowthBook).toHaveBeenCalledWith(
        expect.objectContaining({ attributes })
      );
    });
  });

  describe('getFeatureValue', () => {
    it('should call getFeatureValue', async () => {
      growthbookClientMock.getFeatureValue.mockReturnValue('test-value');

      const value = await growthbookService.getFeatureValue('test', 'default');
      expect(growthbookClientMock.loadFeatures).toBeCalledTimes(1);
      expect(growthbookClientMock.getFeatureValue).toBeCalledWith(
        'test',
        'default'
      );
      expect(value).toEqual('test-value');
    });

    it('should call getFeatureValue with attributes', async () => {
      const gbMock = jest.requireMock('@growthbook/growthbook');
      const attributes = { customerId: '22ac469f-5d20-42c0-aaae-5634571ebc9d' };

      await growthbookService.getFeatureValue('test', 'default', attributes);

      expect(growthbookClientMock.loadFeatures).toBeCalledTimes(1);
      expect(growthbookClientMock.getFeatureValue).toBeCalledWith(
        'test',
        'default'
      );
      expect(gbMock.GrowthBook).toHaveBeenCalledWith(
        expect.objectContaining({ attributes })
      );
    });
  });

  describe('toggleFeatureValue', () => {
    it('should toggleFeatureValue', async () => {
      const body: ToggleFeatureBody = {
        reason: 'test',
        environments: {
          dev: true,
        },
      };

      const axiosMock = createMock<Axios>();
      jest.spyOn(axios, 'post').mockImplementation(axiosMock.post);
      axiosMock.post.mockResolvedValue({
        status: HttpStatus.OK,
        data: {},
      });

      expect(await growthbookService.toggleFeatureValue('test', body));
      expect(axiosMock.post).toBeCalledTimes(1);
    });

    it('should toggleFeatureValue with debounce', async () => {
      const body: ToggleFeatureBody = {
        reason: 'test',
        environments: {
          dev: true,
        },
      };

      const axiosMock = createMock<Axios>();
      jest.spyOn(axios, 'post').mockImplementation(axiosMock.post);
      const mockedResponse = { test: 'test' };
      axiosMock.post.mockResolvedValue({
        status: HttpStatus.OK,
        data: mockedResponse,
      });

      const firstResult = await growthbookService.toggleFeatureValue(
        'test',
        body,
        1000
      );
      const seconResult = await growthbookService.toggleFeatureValue(
        'test',
        body,
        1000
      );

      expect(firstResult).toEqual(mockedResponse);
      expect(seconResult).toEqual({
        message: 'Debounce time not elapsed',
      });
      expect(axiosMock.post).toBeCalledTimes(1);
    });

    it('should toggleFeatureValue 2 times after debounce', async () => {
      const body: ToggleFeatureBody = {
        reason: 'test',
        environments: {
          dev: true,
        },
      };

      const axiosMock = createMock<Axios>();
      jest.spyOn(axios, 'post').mockImplementation(axiosMock.post);
      const mockedResponse = { test: 'test' };
      axiosMock.post.mockResolvedValue({
        status: HttpStatus.OK,
        data: mockedResponse,
      });

      const debounceTimeMs = 1000;

      const firstResult = await growthbookService.toggleFeatureValue(
        'test',
        body,
        debounceTimeMs
      );
      const seconResult = await growthbookService.toggleFeatureValue(
        'test',
        body,
        debounceTimeMs
      );

      await new Promise((resolve) => setTimeout(resolve, debounceTimeMs + 10));

      const thirdResult = await growthbookService.toggleFeatureValue(
        'test',
        body,
        debounceTimeMs
      );

      expect(firstResult).toEqual(mockedResponse);
      expect(seconResult).toEqual({
        message: 'Debounce time not elapsed',
      });
      expect(thirdResult).toEqual(mockedResponse);
      expect(axiosMock.post).toBeCalledTimes(2);
    });
  });
});
