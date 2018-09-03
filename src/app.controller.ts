import {Get, Post, Controller, Body} from '@nestjs/common';
import { AppService } from './services/app.service';
import {Register} from './types/register';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async register(@Body() register: Register): Promise<string> {
      return await this.appService.register(register);
  }
}
