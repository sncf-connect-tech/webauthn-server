import {Injectable, Logger} from '@nestjs/common';
import {Register} from '../types/register';
import {Response} from '../types/response';
import {Login} from '../types/login';
import {ConfigService} from './configuration.service';
import {JWT} from '../types/jwt';
import {generateServerMakeCredRequest, verifyAuthenticatorAttestationResponse, verifyAuthenticatorAssertionResponse, generateServerGetAssertion} from './utils';
import { JwtService } from '@nestjs/jwt';

const mongoose = require('mongoose');
const base64url = require('base64url');

let RegisterModel;

@Injectable()
export class AppService {
    constructor(private config: ConfigService, private readonly jwtService: JwtService) {
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
            const jwt = new JWT(u.username, u.name, challengeMakeCred.challenge);
            return JSON.stringify({
                status: 'ok',
                token: this.jwtService.sign(JSON.stringify(jwt)),
                challenge: challengeMakeCred});
        } catch (error) {
            Logger.error(error)
            return JSON.stringify({
                status: 'failed',
                message: `Register user ko ${error}`});
        }
    }

    async login(login: Login): Promise<string> {
        const u = await RegisterModel.findOne({username: login.username});
        if (!u || !u.registered) {
            return JSON.stringify({
                status: 'failed',
                message: `User ${login.username} does not exist!`});
        }

        const getAssertion = generateServerGetAssertion(u.authenticators);
        getAssertion.status = 'ok';

        const jwt = new JWT(u.username, u.name, getAssertion.challenge);
        jwt.loggedIn = false;

        return JSON.stringify({
            status: 'ok',
            token: this.jwtService.sign(JSON.stringify(jwt)),
            challenge: getAssertion});
    }

    async response(register: Response, payload: JWT): Promise<string> {
        if (register.type !== 'public-key') {
            return JSON.stringify({
                status: 'failed',
                message: 'Response type is not public-key!'});
        } else {
            const webauthnResp = register;
            const clientData   = JSON.parse(base64url.decode(webauthnResp.response.clientDataJSON));

            /* Check challenge... */
            if (clientData.challenge !== payload.challenge) {
                return JSON.stringify({
                    status: 'failed',
                    message: 'Challenges don\'t match!'})};

            /* ...and origin */
            if (clientData.origin !== this.config.get('ORIGIN_AUTHENT')) {
                return JSON.stringify({
                    status: 'failed',
                    message: 'Origins don\'t match!'});
            }

            let result;
            const u = await RegisterModel.findOne({username: payload.username});
            if (webauthnResp.response.attestationObject !== undefined) {
                /* This is create cred */
                result = verifyAuthenticatorAttestationResponse(webauthnResp);

                if (result.verified) {
                    u.authenticators = u.authenticators ? u.authenticators : [];
                    u.authenticators.push(result.authrInfo);
                    u.registered = true;
                    await u.save();
                }
            } else if (webauthnResp.response.authenticatorData !== undefined) {
                /* This is get assertion */
                result = verifyAuthenticatorAssertionResponse(webauthnResp, u.authenticators);
            } else {
                return JSON.stringify({
                    status: 'failed',
                    message: 'Can not determine type of response!'});
            }

            if (result.verified) {
                payload.loggedIn = true;
                return JSON.stringify({
                    status: 'ok',
                    token: this.jwtService.sign(JSON.stringify(payload))});
            } else {
                return JSON.stringify({
                    status: 'failed',
                    message: 'Can not authenticate signature!'});
            }
        }
    }

    async validateUser(payload: JWT): Promise<any> {
        const response = await RegisterModel.findOne({username: payload.username});
        const user = response._doc;
        return user;
    }

    isLoggedIn(payload: JWT): any {
        return payload ? payload.loggedIn : false;
    }
}
