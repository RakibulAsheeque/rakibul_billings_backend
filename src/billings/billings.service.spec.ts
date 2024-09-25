import { Test, TestingModule } from '@nestjs/testing';
import { BillingsService } from './billings.service';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('BillingsService', () => {
  let calculateService: BillingsService;
  let currencyExchangeService: CurrencyExchangeService;
  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingsService,
        CurrencyExchangeService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    calculateService = module.get<BillingsService>(BillingsService);
    currencyExchangeService = module.get<CurrencyExchangeService>(
      CurrencyExchangeService,
    );
  });

  it('should be defined', () => {
    expect(calculateService).toBeDefined();
  });

  it('should apply discounts based on user type and tenure', () => {
    const discountEmployee = calculateService.applyDiscountByUserType(
      'EMPLOYEE',
      0,
    );
    expect(discountEmployee).toBe(0.3);

    const discountAffiliate = calculateService.applyDiscountByUserType(
      'AFFILIATE',
      0,
    );
    expect(discountAffiliate).toBe(0.1);

    const discountCustomer2Years = calculateService.applyDiscountByUserType(
      'CUSTOMER',
      2,
    );
    expect(discountCustomer2Years).toBe(0.05);

    const discountCustomerLessThan2Years =
      calculateService.applyDiscountByUserType('CUSTOMER', 1);
    expect(discountCustomerLessThan2Years).toBe(0);
  });

  // Add more test cases as needed for other methods in BillingsService

  // Optionally, you can also mock methods of CurrencyExchangeService and test the create method
  it('should calculate the final amount and return a response', async () => {
    // Mock request and response objects
    const req: any = {
      body: {
        items: [
          {
            item: 'test',
            category: 'BULK',
            amount: 21,
          },
        ],
        totalAmount: 21,
        userType: 'EMPLOYEE',
        customerTenure: 3,
        originalCurrency: 'AED',
        targetCurrency: 'INR',
      },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const response = await calculateService.calculate(req, res);

    // Add appropriate assertions to test the response
  });
});
