import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { Request, Response } from 'express';
import { AuthGuard } from '../shared/auth.guard';

@Controller('api/calculate')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  processBilling(@Req() req: Request, @Res() res: Response) {
    return this.billingsService.calculate(req, res);
  }
}
