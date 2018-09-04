import {Get, Post, Controller, Body, Req} from '@nestjs/common';
import { AppService } from './services/app.service';
import {Register} from './types/register';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  async register(@Body() register: Register): Promise<string> {
      return await this.appService.register(register);
  }

    @Get('isLoggedIn')
    isLoggedIn(@Req() req): boolean {
        return this.appService.isLoggedIn(req.headers.Bearer);
    }
}
