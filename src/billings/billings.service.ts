import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';

@Injectable()
export class BillingsService {
  constructor(private currencyExchangeService: CurrencyExchangeService) {}

  async calculate(req: Request, res: Response): Promise<Response> {
    const {
      items,
      totalAmount,
      userType,
      customerTenure,
      originalCurrency,
      targetCurrency,
    } = req.body;

    const itemList = items;

    let validItemsAmount: number = 0;

    for (const item of itemList) {
      if (item.category.toUpperCase() !== 'GROCERY') {
        validItemsAmount += +item.amount;
      }
    }

    const userDiscount = this.applyDiscountByUserType(userType, customerTenure);

    const userDiscountTotal = totalAmount - userDiscount * validItemsAmount;

    const convertAmountToUSD: number =
      await this.currencyExchangeService.convertAmountToUSD(
        userDiscountTotal,
        originalCurrency,
      );

    // Discount of USD 5 for every USD 100
    const discountOnTheTotalInUSD = Math.floor(convertAmountToUSD / 100) * 5;

    const finalAmount = convertAmountToUSD - discountOnTheTotalInUSD;

    const totalInTargetCurrency =
      await this.currencyExchangeService.convertAmountToTargetCurrency(
        finalAmount,
        targetCurrency,
      );

    const response = {
      netAmountPayable: parseFloat(totalInTargetCurrency.toFixed(2)),
      currency: targetCurrency,
    };

    return res.status(200).json(response);
  }

  applyDiscountByUserType(userType: string, customerTenure: number): number {
    let discountPercentage: number = 0;
    switch (userType) {
      case 'EMPLOYEE':
        discountPercentage = 0.3;
        break;
      case 'AFFILIATE':
        discountPercentage = 0.1;
        break;
      case 'CUSTOMER':
        if (customerTenure >= 2) {
          discountPercentage = 0.05;
          break;
        } else {
          discountPercentage = 0;
          break;
        }
      default:
        discountPercentage = 0;
        break;
    }
    return discountPercentage;
  }
}
