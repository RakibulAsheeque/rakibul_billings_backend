import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const apiKey = request.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
      return false;
    } else {
      return true;
    }
  }
}
