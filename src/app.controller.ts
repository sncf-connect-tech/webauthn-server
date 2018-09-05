import {Get, Post, Controller, Body, Req, UseGuards} from '@nestjs/common';
import {AppService} from './services/app.service';
import {Register} from './types/register';
import {Response} from './types/Response';
import {ExtractJwt} from 'passport-jwt';
import {AuthGuard} from '@nestjs/passport';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post('register')
    async register(@Body() register: Register): Promise<string> {
        return await this.appService.register(register);
    }

    @Post('response')
    @UseGuards(AuthGuard('jwt'))
    async response(@Body() response: Response, @Req() req): Promise<string> {
        const jwtFromRequest = req.user;
        return await this.appService.response(response, jwtFromRequest);
    }

    @Get('isLoggedIn')
    isLoggedIn(@Req() req): boolean {
        return this.appService.isLoggedIn(req.headers.Bearer);
    }
}
