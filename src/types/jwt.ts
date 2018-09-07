import {ApiModelProperty} from '@nestjs/swagger';
import {Moment} from 'moment';

const moment = require('moment');

export class JWT {
    constructor(username: string, name: string, challenge: string){
        this.username = username;
        this.name = name;
        this.challenge = challenge;
        this.expireIn = moment();
    }
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    name: string;
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    challenge: string;
    @ApiModelProperty()
    loggedIn: boolean;
    expireIn: Moment;
}