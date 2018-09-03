import {prop, Typegoose} from 'typegoose';
import {ApiModelProperty} from '@nestjs/swagger';

export class AuthInfos extends Typegoose {
    constructor() {
        super();
    }
    @prop({ required: true })
    @ApiModelProperty()
    fmt: string;
    @prop({ required: true })
    @ApiModelProperty()
    publicKey: string;
    @prop({ required: true })
    @ApiModelProperty()
    counter: string;
    @prop({ required: true })
    @ApiModelProperty()
    credID: string;
}