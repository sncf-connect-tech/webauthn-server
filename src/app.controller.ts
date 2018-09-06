import {Get, Post, Controller, Body, Req, UseGuards} from '@nestjs/common';
import {AppService} from './services/app.service';
import {Register} from './types/register';
import {Response} from './types/Response';
import {Login} from './types/login';
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
    @UseGuards(AuthGuard('jwt'))
    isLoggedIn(@Req() req): boolean {
        return this.appService.isLoggedIn(req.user);
    }

    @Post('login')
    login(@Body() login: Login): Promise<string> {
        return this.appService.login(login);
    }

    @Get('personalInfo')
    @UseGuards(AuthGuard('jwt'))
    personal(@Req() req): string {
        return JSON.stringify({
            status: 'ok',
            theSecret: 'this is the big secret page message',
            name: req.user.token});
    }
}
