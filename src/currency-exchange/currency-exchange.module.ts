import { Module } from '@nestjs/common';
import { CurrencyExchangeService } from './currency-exchange.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  // imports: [CacheModule.register()],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
