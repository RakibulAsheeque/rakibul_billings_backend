import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyExchangeService } from './currency-exchange.service';
import axios from 'axios';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

jest.mock('axios');

describe('CurrencyExchangeService', () => {
  let currencyExchangeService: CurrencyExchangeService;

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyExchangeService,
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
      imports: [CacheModule.register()],
    }).compile();

    currencyExchangeService = module.get<CurrencyExchangeService>(
      CurrencyExchangeService,
    );
  });

  it('should be defined', () => {
    expect(currencyExchangeService).toBeDefined();
  });

  it('should fetch USD currency exchange rate', async () => {
    const mockExchangeRates = {
      data: {
        conversion_rates: {
          EUR: 0.85,
          GBP: 0.73,
        },
      },
    };

    (axios as jest.Mocked<typeof axios>).get.mockResolvedValue(
      mockExchangeRates,
    );

    const exchangeRates =
      await currencyExchangeService.fetchUSDCurrencyExchangeRate();

    expect(exchangeRates).toEqual(mockExchangeRates.data.conversion_rates);
  });

  it('should convert amount to USD', async () => {
    const mockExchangeRates = {
      EUR: 0.85,
      GBP: 0.73,
    };

    jest
      .spyOn(currencyExchangeService, 'fetchUSDCurrencyExchangeRate')
      .mockResolvedValue(mockExchangeRates);

    const convertedAmount = await currencyExchangeService.convertAmountToUSD(
      221,
      'EUR',
    );

    expect(convertedAmount).toEqual(260);
  });

  it('should convert amount to target currency', async () => {
    const mockExchangeRates = {
      EUR: 0.85,
      GBP: 0.73,
    };

    jest
      .spyOn(currencyExchangeService, 'fetchUSDCurrencyExchangeRate')
      .mockResolvedValue(mockExchangeRates);

    const convertedAmount =
      await currencyExchangeService.convertAmountToTargetCurrency(260, 'EUR');
    expect(convertedAmount).toEqual(221);
  });
});
