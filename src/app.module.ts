import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BillingsModule } from './billings/billings.module';
import { CurrencyExchangeModule } from './currency-exchange/currency-exchange.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    BillingsModule,
    CurrencyExchangeModule,
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
