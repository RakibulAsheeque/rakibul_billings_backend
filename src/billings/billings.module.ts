import { Module } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { BillingsController } from './billings.controller';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';

@Module({
  controllers: [BillingsController],
  providers: [BillingsService, CurrencyExchangeService],
})
export class BillingsModule {}
