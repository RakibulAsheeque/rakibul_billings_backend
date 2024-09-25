import { Test, TestingModule } from '@nestjs/testing';
import { BillingsController } from './billings.controller';
import { BillingsService } from './billings.service';
import { Request, Response } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';

describe('BillingsController', () => {
  let calculateController: BillingsController;
  let calculateService: BillingsService;
  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingsController],
      providers: [
        BillingsService,
        CurrencyExchangeService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    calculateService = module.get<BillingsService>(BillingsService);
    calculateController = module.get<BillingsController>(BillingsController);
  });

  it('should be defined', () => {
    expect(calculateController).toBeDefined();
  });

  it('should call calculateService.create with the request and response objects', async () => {
    const mockReq = {
      body: {
        items: [],
      },
    } as unknown as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const createSpy = jest.spyOn(calculateService, 'calculate');
    await calculateController.processBilling(mockReq, mockRes);

    expect(createSpy).toHaveBeenCalledWith(mockReq, mockRes);
  });
});
