import {ApiModelProperty} from '@nestjs/swagger';
import {AuthInfos} from './authinfos';

export class JWT {
    constructor(username: string, name: string, challenge: string){
        this.username = username;
        this.name = name;
        this.challenge = challenge;
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
}