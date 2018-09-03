import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppService } from './services/app.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT } from './types/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly appService: AppService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'this_is_my_secret_key',
        });
    }

    async validate(payload: JWT) {
        const user = await this.appService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}