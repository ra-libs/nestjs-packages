import { Test } from '@nestjs/testing';
import { Request, Response } from 'express';

import { XDataHashMiddleware } from '../x-data-hash.middleware';

const fakeRequest = {
  headers: {
    'x-trace-id': 'abc-123',
    'x-customer-id': '123-abc-customer',
    'x-end-to-end': '123-abc-endToEnd',
    'x-idempotent-id': '123-idempotent',
  },
} as unknown as Request;

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
} as unknown as Response;

const fakeNext = jest.fn();

const xDataObject = {
  accessPrivate: {
    username: '95573414593',
    name: 'Marcela Tangerina',
    socialName: null,
    email: '808620372399@devtoolbox.com.br',
    phone: '5530952860121',
    active: true,
    emailVerified: true,
    phoneVerified: true,
    device: {
      id: '03f0a78b-ac8a-4f43-940f-5821ab31a4b0',
      model: 'M2101K7AG',
      vendor: 'Xiaomi',
      os: '30',
      createdAt: '2022-07-12T18:21:08.211Z',
    },
    createdAt: '2022-07-12T18:21:08.218Z',
    modifiedAt: '2022-07-12T19:02:24.983Z',
    customer: {
      birthDate: '08/08/1988',
    },
    cfi: {
      account: '98390604',
      digit: '4',
      branch: '0001',
    },
    card: {
      account: '87087301',
    },
  },
  accessPublic: {
    access_token:
      'eyJhbGciOiJFUzI1NiIsImtpZCI6InAyMC1rZXktaWQifQ.eyJzdWIiOiI5NmMwNWYyMi1iYWY4LTQ5NmYtYTdjOC00ZTU4ZjI3NzhlOTEiLCJpc3MiOiJodHRwOi8vYXV0aC1zZXJ2aWNlLmF1dGgtc2VydmljZS5zdmMuY2x1c3Rlci5sb2NhbDozMDAwL2F1dGgtc2VydmljZS92MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsImV4cCI6MTY3NjMyMzAxOCwianRpIjoiNzM4MDMxZWEtYmE4Yy00MDc1LTk1ZTktODBkY2Q3YjQ0YzQ2In0.tOcPW6HXa3ne2baq-G8ymEcVbox8ZjT0dNpcZnV2e1Y8Neg3yIxUBQLd0XmGxfoDvmWecs8ciuvNycKJl9RIvw',
    token_type: 'bearer',
    refresh_token:
      'eyJhbGciOiJFUzI1NiIsImtpZCI6InAyMC1rZXktaWQifQ.eyJzdWIiOiI5NmMwNWYyMi1iYWY4LTQ5NmYtYTdjOC00ZTU4ZjI3NzhlOTEiLCJpc3MiOiJodHRwOi8vYXV0aC1zZXJ2aWNlLmF1dGgtc2VydmljZS5zdmMuY2x1c3Rlci5sb2NhbDozMDAwL2F1dGgtc2VydmljZS92MSIsInRva2VuX3VzZSI6InJlZnJlc2giLCJleHAiOjE2NzYzMjMwMTgsImp0aSI6ImMwOGM5ZmI3LWQ5ZmMtNGMwZS1hZGU5LWE1ZGZhMTRmZWI5ZCIsImF0aSI6IjczODAzMWVhLWJhOGMtNDA3NS05NWU5LTgwZGNkN2I0NGM0NiJ9.a6PJZ3XCIs_rfYuIPFBeSO0ch13jYmhQYYFehlIzxLrdImUQ08rLtBuSFlsb0dclKp5hr_X0C9-21GNkbUY_UQ',
    jti: '738031ea-ba8c-4075-95e9-80dcd7b44c46',
    sub: '96c05f22-baf8-496f-a7c8-4e58f2778e91',
    roles: ['CLIENT_INVESTIMENT', 'CLIENT_CREDIT', 'CLIENT_ACCOUNT'],
    name: 'Marcela Tangerina',
    socialName: null,
    phone: '5530952860121',
    email: '808620372399@devtoolbox.com.br',
    emailVerified: true,
    phoneVerified: true,
  },
};

describe('XDataHashMiddleware', () => {
  let httpFillUserDataInterceptor: XDataHashMiddleware;

  describe('Account api client module Scenarios', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [],
        providers: [XDataHashMiddleware],
      }).compile();
      httpFillUserDataInterceptor =
        module.get<XDataHashMiddleware>(XDataHashMiddleware);
    });

    it('Should validate if module loaded by accountApiClientService instance defined', () => {
      expect(httpFillUserDataInterceptor).toBeDefined();
    });

    describe('intercept', () => {
      it('should be able return a bad request if x-data-hash is undefined', async () => {
        httpFillUserDataInterceptor.use(fakeRequest, mockResponse, fakeNext);

        const spyResponseStatus = jest.spyOn(mockResponse, 'status');
        const spyResponseSend = jest.spyOn(mockResponse, 'send');

        expect(spyResponseStatus).toHaveBeenCalledWith(400);
        expect(spyResponseSend).toHaveBeenCalledWith({
          statusCode: 400,
          message: 'Invalid provided token. X-data-hash is undefined.',
        });
      });

      it('should be able return a bad request if x-data-hash is not a valid json', async () => {
        const mockFakeRequestToken = {
          headers: {
            'x-data-hash': 'eyJpbnZhbGlkIgo=',
          },
        } as unknown as Request;
        httpFillUserDataInterceptor.use(
          mockFakeRequestToken,
          mockResponse,
          fakeNext
        );

        const spyResponseStatus = jest.spyOn(mockResponse, 'status');
        const spyResponseSend = jest.spyOn(mockResponse, 'send');

        expect(spyResponseStatus).toHaveBeenCalledWith(400);
        expect(spyResponseSend).toHaveBeenCalledWith({
          statusCode: 400,
          message: 'Token JWT Inválido',
        });
      });
      it('should be able call next function', async () => {
        const mockFakeRequestToken = {
          headers: {
            'x-data-hash': Buffer.from(JSON.stringify(xDataObject)).toString(
              'base64'
            ),
          },
        } as unknown as Request;

        httpFillUserDataInterceptor.use(
          mockFakeRequestToken,
          mockResponse,
          fakeNext
        );

        expect(fakeNext).toHaveBeenCalled();
      });
    });
  });
});
