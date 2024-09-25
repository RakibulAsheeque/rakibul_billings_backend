import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class CurrencyExchangeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async fetchUSDCurrencyExchangeRate() {
    try {
      let exchangeRates;
      const cachedRates = await this.cacheManager.get('USD');
      if (cachedRates) {
        exchangeRates = cachedRates;
      } else {
        const fetchExchangeRates = await axios.get(
          `${process.env.CURRENT_EXCHANGE_RATE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`,
        );

        exchangeRates = fetchExchangeRates.data.conversion_rates;
        const ttl =
          fetchExchangeRates.data.time_next_update_unix * 1000 - Date.now();

        await this.cacheManager.set('USD', exchangeRates, ttl);
      }

      return exchangeRates;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return error.response.data;
      } else {
        return error;
      }
    }
  }

  async convertAmountToUSD(amount: number, currency: string): Promise<number> {
    try {
      const getUSDExchangeRate = await this.fetchUSDCurrencyExchangeRate();
      const currencyExchangeRate: number = getUSDExchangeRate[currency];

      const convertAmount = amount / currencyExchangeRate;
      return convertAmount;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async convertAmountToTargetCurrency(
    amount: number,
    currency: string,
  ): Promise<number> {
    try {
      const getUSDExchangeRate = await this.fetchUSDCurrencyExchangeRate();
      const currencyExchangeRate: number = getUSDExchangeRate[currency];

      const convertAmount = amount * currencyExchangeRate;
      return convertAmount;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
