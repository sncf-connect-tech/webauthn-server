import {ApiModelProperty} from '@nestjs/swagger';
import {AuthInfos} from './authinfos';

export class JWT {
    constructor(username: string, firstname: string, lastname: string, challenge: string){
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.challenge = challenge;
    }
    @ApiModelProperty()
    username: string;
    @ApiModelProperty()
    firstname: string;
    @ApiModelProperty()
    lastname: string;
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    challenge: string;
}