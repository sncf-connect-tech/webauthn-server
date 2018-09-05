import {Injectable, Logger} from '@nestjs/common';
import {Register} from '../types/register';
import {ConfigService} from './configuration.service';
import {JWT} from '../types/jwt';
import {generateServerMakeCredRequest} from './utils';
import { JwtService } from '@nestjs/jwt';

const mongoose = require('mongoose');

let RegisterModel;

@Injectable()
export class AppService {
    constructor(config: ConfigService, private readonly jwtService: JwtService) {
        mongoose.connect(config.get('MONGO_URL'), {useNewUrlParser: true});
        RegisterModel = new Register().getModelForClass(Register, {existingConnection: mongoose});
    }

    async register(register: Register): Promise<string> {
        Logger.log('Register user', JSON.stringify(register));
        try {
            register.registered = true;
            let u = await RegisterModel.findOne({username: register.username});
            Logger.log('User in database : ', JSON.stringify(u));
            if (u) {
                Logger.log('Existing user');
                return JSON.stringify({
                    status: 'failed',
                    message: `Username ${register.username} already exists`});
            } else {
                Logger.log('New user');
                register.registered = false;
                u = new RegisterModel(register);
            }
            await u.save();
            Logger.log('Register user ok', JSON.stringify(u));

            const challengeMakeCred = generateServerMakeCredRequest(register.username, register.name, u.id);
            return JSON.stringify({
                status: 'ok',
                challenge: challengeMakeCred});
            /*const jwt = new JWT(u.username, u.name, challengeMakeCred);
            return JSON.stringify({
                status: 'ok',
                token: this.jwtService.sign(JSON.stringify(jwt)),
                message: `OK`});*/
        } catch (error) {
            Logger.error(error)
            return JSON.stringify({
                status: 'failed',
                message: `Register user ko ${error}`});
        }
    }

    async validateUser(payload: JWT): Promise<any> {
        return await RegisterModel.findOne(payload);
    }

    isLoggedIn(payload: JWT): any {
        return payload ? payload.loggedIn : false;
    }
}
